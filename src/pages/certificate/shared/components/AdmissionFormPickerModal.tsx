import React, { useState, useEffect, useMemo } from 'react';
import { Search, UserCheck, Calendar, Phone, GraduationCap, X, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { fetchAdmissionCandidates, type AdmissionCandidate } from '../services/admissionDataService';

interface AdmissionFormPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCandidate: (candidate: AdmissionCandidate) => void;
  targetType: 'idcard' | 'certificate';
}

export const AdmissionFormPickerModal: React.FC<AdmissionFormPickerModalProps> = ({
  isOpen,
  onClose,
  onSelectCandidate,
  targetType
}) => {
  const [candidates, setCandidates] = useState<AdmissionCandidate[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCandidateId, setSelectedCandidateId] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      loadCandidates();
    }
  }, [isOpen]);

  const loadCandidates = async () => {
    setLoading(true);
    try {
      const list = await fetchAdmissionCandidates();
      setCandidates(list);
      if (list.length > 0) {
        setSelectedCandidateId(list[0].id);
      }
    } catch (e) {
      console.error('Error fetching admission candidates:', e);
    } finally {
      setLoading(false);
    }
  };

  const filteredCandidates = useMemo(() => {
    const q = searchTerm.toLowerCase().trim();
    if (!q) return candidates;
    return candidates.filter(c => 
      c.studentName.toLowerCase().includes(q) ||
      c.courseName.toLowerCase().includes(q) ||
      (c.applicationReference && c.applicationReference.toLowerCase().includes(q)) ||
      (c.contactNumber && c.contactNumber.includes(q)) ||
      (c.dob && c.dob.includes(q)) ||
      (c.doj && c.doj.includes(q))
    );
  }, [candidates, searchTerm]);

  const activeSelected = candidates.find(c => c.id === selectedCandidateId);

  const handleConfirm = () => {
    if (activeSelected) {
      onSelectCandidate(activeSelected);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-3xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-5 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-white">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold m-0 leading-tight">
                Fetch Details from Admission Form
              </h3>
              <p className="text-xs text-blue-100 m-0 mt-0.5">
                Select an applicant to pre-fill {targetType === 'idcard' ? 'smart ID card credentials' : 'official certificate details'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search & Refresh Bar */}
        <div className="p-4 border-b border-slate-200 bg-slate-50/80 flex items-center gap-2.5">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by student name, course, phone, DOB, or application reference..."
              className="w-full text-xs font-semibold pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900"
            />
          </div>
          <button
            type="button"
            onClick={loadCandidates}
            disabled={loading}
            className="p-2.5 bg-white border border-slate-300 rounded-xl hover:bg-slate-100 text-slate-700 transition-all cursor-pointer shrink-0"
            title="Refresh list"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-blue-600' : ''}`} />
          </button>
        </div>

        {/* Candidate List & Preview */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {loading ? (
            <div className="py-12 text-center text-slate-500 text-sm font-semibold flex flex-col items-center gap-2">
              <RefreshCw className="w-6 h-6 animate-spin text-blue-600" />
              <span>Loading admission form records...</span>
            </div>
          ) : filteredCandidates.length === 0 ? (
            <div className="py-12 text-center text-slate-500 text-sm space-y-1">
              <AlertCircle className="w-7 h-7 mx-auto text-amber-500" />
              <p className="font-bold text-slate-700 m-0">No matching admission records found</p>
              <p className="text-xs text-slate-400 m-0">Try adjusting your search query</p>
            </div>
          ) : (
            filteredCandidates.map(c => {
              const isSelected = c.id === selectedCandidateId;
              return (
                <div
                  key={c.id}
                  onClick={() => setSelectedCandidateId(c.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                    isSelected 
                      ? 'bg-blue-50/70 border-blue-500 ring-2 ring-blue-500/20 shadow-xs' 
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Photo or Initials */}
                    {c.photoUrl ? (
                      <img
                        src={c.photoUrl}
                        alt={c.studentName}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0 shadow-xs"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-xs">
                        {c.studentName.slice(0, 2).toUpperCase()}
                      </div>
                    )}

                    {/* Candidate Details */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-sm text-slate-900">{c.studentName}</span>
                        <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded border border-slate-200">
                          {c.applicationReference}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-700 mt-0.5 truncate">
                        <GraduationCap className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{c.courseName}</span>
                      </div>
                      
                      {/* Meta badges: DOB, DOJ, Phone */}
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500 mt-1.5">
                        {c.dob && (
                          <span className="inline-flex items-center gap-1">
                            <span className="font-bold text-slate-700">DOB:</span> {c.dob}
                          </span>
                        )}
                        {(c.doj || c.joiningDate) && (
                          <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                            <span className="font-bold">DOJ:</span> {c.doj || c.joiningDate}
                          </span>
                        )}
                        {c.contactNumber && (
                          <span className="inline-flex items-center gap-1">
                            <Phone className="w-3 h-3 text-slate-400" />
                            {c.contactNumber}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectCandidate(c);
                      onClose();
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                    }`}
                  >
                    Select &amp; Populate
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 sm:p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            {activeSelected ? (
              <span>Selected: <strong className="text-slate-800">{activeSelected.studentName}</strong> ({activeSelected.courseName})</span>
            ) : (
              <span>Please pick a student to populate</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 text-xs font-bold text-slate-600 hover:bg-slate-200 bg-slate-100 rounded-xl transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!activeSelected}
              onClick={handleConfirm}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer active:scale-95"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Populate {targetType === 'idcard' ? 'ID Card' : 'Certificate'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
