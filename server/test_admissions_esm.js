// Self-contained ES Module test runner for admissions and course activation
process.env.TEST_MODE = '1';

import http from 'http';

async function main() {
  const { default: app } = await import('./server.js');
  const TEST_PORT = 5062;
  const runId = Date.now();

  function request(method, path, data = null) {
    return new Promise((resolve, reject) => {
      const postData = data ? JSON.stringify(data) : '';
      const req = http.request({
        hostname: '127.0.0.1',
        port: TEST_PORT,
        path,
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(data ? { 'Content-Length': Buffer.byteLength(postData) } : {})
        }
      }, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          try {
            const json = body ? JSON.parse(body) : null;
            resolve({ status: res.statusCode, data: json, raw: body });
          } catch (e) {
            resolve({ status: res.statusCode, raw: body, data: null });
          }
        });
      });

      req.on('error', (err) => reject(err));
      if (data) req.write(postData);
      req.end();
    });
  }

  console.log(`🚀 Starting Admission Verification & Course Activation Tests (Run ${runId})...\n`);
  let passed = 0;
  let failed = 0;

  function assert(condition, testName, extraInfo = '') {
    if (condition) {
      console.log(`✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`❌ FAIL: ${testName} ${extraInfo ? '-> ' + extraInfo : ''}`);
      failed++;
    }
  }

  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(TEST_PORT, '127.0.0.1', resolve));
  console.log(`📡 Test server successfully listening on http://127.0.0.1:${TEST_PORT}\n`);

  try {
    // 1. Fetch admissions list
    console.log('--- Test 1: GET /api/admissions ---');
    const getRes = await request('GET', '/api/admissions');
    assert(getRes.status === 200, 'GET /api/admissions returns status 200');
    assert(Array.isArray(getRes.data) && getRes.data.length >= 6, 'Admissions list has seeded records');

    const readyAdm = getRes.data.find(a => a.applicationReference === 'APP-2026-001');
    const unpaidAdm = getRes.data.find(a => a.applicationReference === 'APP-2026-002');
    const incompleteAdm = getRes.data.find(a => a.applicationReference === 'APP-2026-003');
    const noIdCardAdm = getRes.data.find(a => a.applicationReference === 'APP-2026-005');
    const activatedAdm = getRes.data.find(a => a.applicationReference === 'APP-2026-006');

    assert(readyAdm && readyAdm.verificationStatus === 'Ready for Approval', 'APP-2026-001 is Ready for Approval');
    assert(unpaidAdm && unpaidAdm.verificationStatus === 'Payment Pending', 'APP-2026-002 is Payment Pending');
    assert(incompleteAdm && incompleteAdm.verificationStatus === 'Form Incomplete', 'APP-2026-003 is Form Incomplete');
    assert(noIdCardAdm && noIdCardAdm.verificationStatus === 'ID Card Pending', 'APP-2026-005 is ID Card Pending');
    assert(activatedAdm && activatedAdm.courseActivationStatus === 'Active', 'APP-2026-006 is Active');

    // 2. Test Approval Blocking when conditions incomplete
    console.log('\n--- Test 2: Approval blocked when incomplete ---');
    const blockApproveRes = await request('POST', `/api/admissions/${unpaidAdm._id || unpaidAdm.id}/approve`, {
      adminName: 'Admin Officer'
    });
    assert(blockApproveRes.status === 400, 'Approval blocked for unpaid student with 400 status');
    assert(blockApproveRes.data && blockApproveRes.data.missingConditions && blockApproveRes.data.missingConditions.length > 0, 
      'Missing conditions array returned', JSON.stringify(blockApproveRes.data?.missingConditions));

    // 3. Test Form Incomplete Check
    console.log('\n--- Test 3: Form Verification Validation ---');
    const formVerifyAttempt = await request('PUT', `/api/admissions/${incompleteAdm._id || incompleteAdm.id}/form-verify`, {
      adminName: 'Admin Officer'
    });
    assert(formVerifyAttempt.status === 400, 'Cannot verify form when required fields are missing');

    // 4. Test Payment Webhook Idempotency & Course Non-activation
    console.log('\n--- Test 4: Payment Webhook Idempotency & Non-activation ---');
    const webhookPayload = {
      orderId: `ORD_${runId}`,
      paymentId: `PAY_${runId}`,
      signature: 'TEST_SIG',
      amount: 18000,
      currency: 'INR',
      studentName: `Test Learner ${runId}`,
      studentPhone: '9876543210',
      studentEmail: `learner_${runId}@alphafly.edu`,
      courseName: 'AI-Powered Full Stack',
      applicationReference: `APP-TEST-${runId}`
    };

    // First call
    const hook1 = await request('POST', '/api/payments/webhook', webhookPayload);
    assert(hook1.status === 200, 'First payment webhook processed successfully');
    assert(hook1.data && hook1.data.invoiceNumber && hook1.data.invoiceNumber.startsWith('INV-'), 'Unique invoice number generated');
    assert(hook1.data && hook1.data.courseActivationStatus === 'Locked', 'Course remains locked after confirmed payment');
    assert(hook1.data && hook1.data.paymentStatus === 'Paid', 'Payment status is Paid');
    assert(hook1.data && hook1.data.isDuplicate === false, 'First call is not marked as duplicate');

    // Second call with same paymentId / applicationReference (idempotency check)
    const hook2 = await request('POST', '/api/payments/webhook', webhookPayload);
    assert(hook2.status === 200, 'Second payment webhook accepted idempotently');
    assert(hook2.data && hook2.data.isDuplicate === true, 'Webhook detected as duplicate (no duplicate record created)');
    assert(hook2.data && hook2.data.invoiceNumber === hook1.data.invoiceNumber, 'Same invoice number returned');

    // 5. Test Full 4-Step Approval Flow
    console.log('\n--- Test 5: Full 4-Step Approval Flow ---');
    // Create candidate application with 3 steps satisfied, missing joining date
    const createCandidate = await request('POST', '/api/admissions', {
      studentName: `Workflow Candidate ${runId}`,
      contactNumber: '9123456789',
      email: `candidate_${runId}@alphafly.edu`,
      courseName: 'AI-Powered Full Stack',
      courseKey: 'python_fullstack',
      courseFee: 18000,
      amountPaid: 18000,
      paymentStatus: 'Paid',
      paymentReference: `PAY_CANDIDATE_${runId}`,
      invoiceNumber: `INV-CANDIDATE-${runId}`,
      admissionFormStatus: 'Verified',
      admissionFormData: {
        fullName: `Workflow Candidate ${runId}`,
        phone: '9123456789',
        email: `candidate_${runId}@alphafly.edu`,
        qualification: 'B.Tech IT',
        idProofType: 'Aadhaar',
        idProofNumber: '1234-5678-9012'
      },
      idCardStatus: 'Issued',
      idCardNumber: `AF-ID-2026-${String(runId).slice(-4)}`
    });

    assert(createCandidate.status === 200, 'Test candidate admission created');
    const candidateAdm = createCandidate.data.admission;
    assert(candidateAdm.verificationStatus === 'Joining Date Missing', 'Candidate initial status is Joining Date Missing');

    // Step A: Provide joining date
    const dateRes = await request('PUT', `/api/admissions/${candidateAdm._id || candidateAdm.id}/joining-date`, {
      joiningDate: '2026-11-05',
      adminName: 'Admissions Head'
    });
    assert(dateRes.status === 200, 'Joining date updated successfully');
    const updatedAdmAfterDate = dateRes.data.admission;
    assert(updatedAdmAfterDate && updatedAdmAfterDate.joiningDate === '2026-11-05', 'Joining date saved');
    assert(updatedAdmAfterDate && updatedAdmAfterDate.verificationStatus === 'Ready for Approval', 'Status progressed to Ready for Approval');

    // Step B: Approve Admission
    const approveRes = await request('POST', `/api/admissions/${candidateAdm._id || candidateAdm.id}/approve`, {
      adminName: 'Principal Administrator'
    });
    assert(approveRes.status === 200, 'Approval succeeds when all 4 conditions are met');
    assert(approveRes.data.studentId && approveRes.data.studentId.startsWith('AF-STU-'), 'Unique permanent Student ID assigned');
    assert(approveRes.data.admission && approveRes.data.admission.verificationStatus === 'Approved', 'Verification status is Approved');
    assert(approveRes.data.admission && approveRes.data.admission.courseActivationStatus === 'Active', 'Course activation status is Active');
    assert(approveRes.data.admission && Array.isArray(approveRes.data.admission.auditLogs) && approveRes.data.admission.auditLogs.length > 0, 'Audit log recorded');

    // Check course access endpoint for approved student
    const accessRes = await request('GET', `/api/students/${approveRes.data.studentId}/course-access?course=python_fullstack`);
    assert(accessRes.status === 200, 'Course access check API returns 200');
    assert(accessRes.data.allowed === true, 'Access permitted for approved student');
    assert(accessRes.data.studentId === approveRes.data.studentId, 'Student ID confirmed in access response');

    // 6. Test Suspension / Access Revocation
    console.log('\n--- Test 6: Suspension / Refund Revocation ---');
    const suspendRes = await request('POST', `/api/admissions/${candidateAdm._id || candidateAdm.id}/suspend`, {
      adminName: 'Finance Director',
      reason: 'Course fee refunded upon student withdrawal'
    });
    assert(suspendRes.status === 200, 'Suspension API returns 200');
    assert(suspendRes.data.admission && suspendRes.data.admission.courseActivationStatus === 'Suspended', 'Course activation status changed to Suspended');
    assert(suspendRes.data.admission && suspendRes.data.admission.verificationStatus === 'Suspended', 'Verification status changed to Suspended');

    // Verify course access is now revoked (HTTP 403)
    const revokedAccessRes = await request('GET', `/api/students/${approveRes.data.studentId}/course-access?course=python_fullstack`);
    assert(revokedAccessRes.status === 403, 'Access correctly returns 403 Forbidden after suspension');
    assert(revokedAccessRes.data.allowed === false, 'Access correctly revoked after suspension');

    console.log(`\n========================================`);
    console.log(`TEST SUMMARY: ${passed} Passed, ${failed} Failed`);
    console.log(`========================================\n`);

    server.close();
    process.exit(failed > 0 ? 1 : 0);

  } catch (err) {
    console.error('Test execution error:', err);
    server.close();
    process.exit(1);
  }
}

main();
