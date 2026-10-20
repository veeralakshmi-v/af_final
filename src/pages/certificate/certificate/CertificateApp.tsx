import { useState, useEffect } from 'react';
import type { CertificateData, CustomAssets, ViewMode } from './types/certificate';
import { 
  getStoredCertificates, 
  saveStoredCertificates, 
  getStoredAssets, 
  saveStoredAssets, 
  createNewBlankCertificate,
  generateNextCertificateId,
  recoverAllCertificates,
  INITIAL_CERTIFICATES 
} from './data/certificateStore';
import { CertificateStats } from './components/CertificateStats';
import { CertificateTable } from './components/CertificateTable';
import { CertificateEditor } from './components/CertificateEditor';
import { PreviewModeView } from './components/PreviewModeView';
import { VerificationPortal } from './components/VerificationPortal';
import { AssetManager } from './components/AssetManager';
import { 
  Eye,
  PlusCircle, 
  Upload,
  LayoutDashboard,
  ShieldCheck,
  Award,
  FileSpreadsheet,
  RotateCcw,
  CheckCircle2
} from 'lucide-react';
import { GoogleSheetSyncModal } from '../shared/components/GoogleSheetSyncModal';

export function CertificateApp() {
  const [certificates, setCertificates] = useState<CertificateData[]>([]);
  const [customAssets, setCustomAssets] = useState<CustomAssets>({});
  const [viewMode, setViewMode] = useState<ViewMode>('dashboard');
  const [isSheetModalOpen, setIsSheetModalOpen] = useState<boolean>(false);
  const [recoveryNotice, setRecoveryNotice] = useState<string>('');
  
  // Active editing or previewing certificate
  const [activeCertificate, setActiveCertificate] = useState<CertificateData | null>(null);
  const [previewCertId, setPreviewCertId] = useState<string>('AFE-2026-0001');
  const [verifyTargetId, setVerifyTargetId] = useState<string>('AFE-2026-0001');

  // Load stored state on mount & handle URL path routing (e.g. /verify/AFE-2026-0001)
  useEffect(() => {
    let loadedCerts = getStoredCertificates();
    const loadedAssets = getStoredAssets();

    // Auto-recovery: If local storage only had sample records (less than initial database dataset)
    if (loadedCerts.length < INITIAL_CERTIFICATES.length) {
      loadedCerts = recoverAllCertificates();
      setRecoveryNotice(`Auto-recovered ${loadedCerts.length} certificates from database!`);
      setTimeout(() => setRecoveryNotice(''), 6000);
    }

    setCertificates(loadedCerts);
    setCustomAssets(loadedAssets);

    if (loadedCerts.length > 0) {
      setPreviewCertId(loadedCerts[0].id);
    }

    // Check URL path / hash for verify routes
    const path = window.location.pathname;
    const hash = window.location.hash;
    const verifyMatch = path.match(/\/verify\/([A-Za-z0-9_-]+)/) || hash.match(/#\/verify\/([A-Za-z0-9_-]+)/);
    
    if (verifyMatch && verifyMatch[1]) {
      setVerifyTargetId(verifyMatch[1]);
      setViewMode('verify');
    }
  }, []);

  // Sync certificates to storage
  const updateCertificates = (updatedList: CertificateData[]) => {
    setCertificates(updatedList);
    saveStoredCertificates(updatedList);
  };

  // Sync custom assets to storage
  const handleSaveAssets = (newAssets: CustomAssets) => {
    setCustomAssets(newAssets);
    saveStoredAssets(newAssets);
  };

  // Action: Recover all database certificates
  const handleRecoverDatabase = () => {
    const recovered = recoverAllCertificates();
    updateCertificates(recovered);
    setRecoveryNotice(`Successfully restored all ${recovered.length} certificate records from LMS database!`);
    setTimeout(() => setRecoveryNotice(''), 6000);
  };

  // Action: Start creating a brand new certificate
  const handleNewCertificate = () => {
    const newCert = createNewBlankCertificate(certificates);
    setActiveCertificate(newCert);
    setViewMode('create');
  };

  // Action: Save created or edited certificate
  const handleSaveCertificate = (certificate: CertificateData) => {
    const existingIndex = certificates.findIndex(c => c.id.toLowerCase() === certificate.id.toLowerCase());
    let updated: CertificateData[];

    if (existingIndex >= 0) {
      updated = [...certificates];
      updated[existingIndex] = certificate;
    } else {
      updated = [certificate, ...certificates];
    }

    updateCertificates(updated);
    setActiveCertificate(certificate);
    setPreviewCertId(certificate.id);
  };

  // Action: Edit existing certificate
  const handleEditCertificate = (cert: CertificateData) => {
    setActiveCertificate(cert);
    setViewMode('edit');
  };

  // Action: Direct Preview
  const handlePreviewCertificate = (cert: CertificateData) => {
    setPreviewCertId(cert.id);
    setViewMode('preview');
  };

  // Action: Duplicate certificate
  const handleDuplicateCertificate = (certToDuplicate: CertificateData) => {
    const newId = generateNextCertificateId(certificates);
    const duplicated: CertificateData = {
      ...certToDuplicate,
      id: newId,
      studentName: `${certToDuplicate.studentName}`,
      qrCodeUrl: `https://www.alphafly.in/verify/${newId}`,
      generatedDate: new Date().toISOString().split('T')[0],
    };

    setActiveCertificate(duplicated);
    setViewMode('create');
  };

  // Action: Delete certificate
  const handleDeleteCertificate = (certId: string) => {
    const updated = certificates.filter(c => c.id !== certId);
    updateCertificates(updated);
    if (previewCertId === certId && updated.length > 0) {
      setPreviewCertId(updated[0].id);
    }
  };

  // Action: Open verification portal for specific ID
  const handleOpenVerification = (certId: string) => {
    setVerifyTargetId(certId);
    setViewMode('verify');
  };

  return (
    <div className="space-y-5">
      {/* Sub-Header / Certificate Navigation */}
      <div className="no-print bg-white border border-slate-200 rounded-2xl p-2.5 sm:p-3 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto max-w-full pb-1 md:pb-0">
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <Award className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
            <span className="font-bold text-slate-800 text-xs sm:text-sm whitespace-nowrap">Certificate Studio</span>
          </div>
          <span className="text-xs text-slate-300 shrink-0 hidden sm:inline">|</span>
          <nav className="flex items-center gap-1 shrink-0 overflow-x-auto">
            <button
              type="button"
              onClick={() => setViewMode('dashboard')}
              className={`inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                viewMode === 'dashboard'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode('preview')}
              className={`inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                viewMode === 'preview'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview</span>
            </button>

            <button
              type="button"
              onClick={handleNewCertificate}
              className={`inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                viewMode === 'create'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>New</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setVerifyTargetId(certificates[0]?.id || 'AFE-2026-0001');
                setViewMode('verify');
              }}
              className={`inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                viewMode === 'verify'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verify</span>
            </button>
          </nav>
        </div>

        {/* Right actions: Google Sheet & Asset Manager */}
        <div className="flex items-center gap-2 overflow-x-auto shrink-0 justify-end">
          <button
            type="button"
            onClick={() => setIsSheetModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-all shadow-xs whitespace-nowrap"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">Sync Google Sheet</span>
            <span className="sm:hidden">Google Sheet</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('assets')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
              viewMode === 'assets'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200'
            }`}
            title="Upload custom certificate signatures, stamps, badges, and logos"
          >
            <Upload className="w-3.5 h-3.5 text-blue-600" />
            <span>Upload Assets</span>
          </button>
        </div>
      </div>

      {/* MODE 1: DASHBOARD */}
      {viewMode === 'dashboard' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-base sm:text-lg font-bold text-slate-900">Certificate Records</h1>
              <p className="text-xs text-slate-500">View, edit, duplicate, and export certificates.</p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleRecoverDatabase}
                className="inline-flex items-center gap-1.5 px-3 py-2 sm:py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-xl text-xs font-bold transition-all flex-1 sm:flex-initial justify-center shadow-xs cursor-pointer"
                title="Recover all 31 student certificates from LMS database"
              >
                <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
                <span>Recover All DB ({certificates.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setIsSheetModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-2 sm:py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-bold transition-all flex-1 sm:flex-initial justify-center"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                <span>Sync Sheet</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('preview')}
                className="inline-flex items-center gap-1.5 px-3 py-2 sm:py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-xl text-xs font-semibold transition-colors flex-1 sm:flex-initial justify-center"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Preview</span>
              </button>

              <button
                type="button"
                onClick={handleNewCertificate}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 sm:py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all active:scale-95 w-full sm:w-auto justify-center"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>New Certificate</span>
              </button>
            </div>
          </div>

          {recoveryNotice && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between gap-2 shadow-xs transition-all">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{recoveryNotice}</span>
              </div>
              <button
                type="button"
                onClick={() => setRecoveryNotice('')}
                className="text-emerald-700 hover:text-emerald-950 font-bold text-xs cursor-pointer ml-auto"
              >
                ✕
              </button>
            </div>
          )}

          <CertificateStats certificates={certificates} />

          <CertificateTable
            certificates={certificates}
            onView={handlePreviewCertificate}
            onEdit={handleEditCertificate}
            onDuplicate={handleDuplicateCertificate}
            onDelete={handleDeleteCertificate}
          />
        </div>
      )}

      {/* MODE 2: DEDICATED PREVIEW MODE */}
      {viewMode === 'preview' && (
        <PreviewModeView
          certificates={certificates}
          selectedCertId={previewCertId}
          customAssets={customAssets}
          onEditCertificate={handleEditCertificate}
          onNewCertificate={handleNewCertificate}
          onVerifyView={handleOpenVerification}
        />
      )}

      {/* MODE 3 & 4: CREATE / EDIT CERTIFICATE */}
      {(viewMode === 'create' || viewMode === 'edit') && activeCertificate && (
        <CertificateEditor
          initialData={activeCertificate}
          customAssets={customAssets}
          isEditingExisting={viewMode === 'edit'}
          onSave={handleSaveCertificate}
          onCancel={() => setViewMode('dashboard')}
        />
      )}

      {/* MODE 5: VERIFICATION PORTAL */}
      {viewMode === 'verify' && (
        <VerificationPortal
          certificateId={verifyTargetId}
          certificate={certificates.find(c => c.id.toLowerCase() === verifyTargetId.toLowerCase())}
          customAssets={customAssets}
          onBackToDashboard={() => setViewMode('dashboard')}
        />
      )}

      {/* MODE 6: ASSET MANAGER */}
      {viewMode === 'assets' && (
        <AssetManager
          customAssets={customAssets}
          onSaveAssets={handleSaveAssets}
          onBackToDashboard={() => setViewMode('dashboard')}
        />
      )}

      {/* GOOGLE SHEETS LIVE SYNC MODAL */}
      <GoogleSheetSyncModal
        isOpen={isSheetModalOpen}
        onClose={() => setIsSheetModalOpen(false)}
        title="Sync Certificates with Google Sheets"
        moduleType="certificate"
        onImport={(importedCerts) => {
          updateCertificates([...importedCerts, ...certificates]);
        }}
      />
    </div>
  );
}

export default CertificateApp;
