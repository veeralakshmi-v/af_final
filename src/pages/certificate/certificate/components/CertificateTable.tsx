import React, { useState } from 'react';
import type { CertificateData } from '../types/certificate';
import { 
  Eye, 
  Edit3, 
  Copy, 
  Trash2, 
  Search, 
  FileCheck,
  ChevronDown
} from 'lucide-react';

interface CertificateTableProps {
  certificates: CertificateData[];
  onView: (cert: CertificateData) => void;
  onEdit: (cert: CertificateData) => void;
  onDuplicate: (cert: CertificateData) => void;
  onDelete: (certId: string) => void;
}

export const CertificateTable: React.FC<CertificateTableProps> = ({
  certificates,
  onView,
  onEdit,
  onDuplicate,
  onDelete,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourseFilter, setSelectedCourseFilter] = useState('ALL');

  const uniqueCourses = Array.from(new Set(certificates.map(c => c.courseName).filter(Boolean)));

  const filteredCertificates = certificates.filter(cert => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || (
      (cert.studentName || '').toLowerCase().includes(q) ||
      (cert.id || '').toLowerCase().includes(q) ||
      (cert.courseName || '').toLowerCase().includes(q) ||
      (cert.formattedDuration && cert.formattedDuration.toLowerCase().includes(q))
    );

    const matchesCourse = selectedCourseFilter === 'ALL' || cert.courseName === selectedCourseFilter;

    return matchesSearch && matchesCourse;
  });

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
      {/* Search & Course Filter */}
      <div className="p-3.5 border-b border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-50/60">
        
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by student name, ID, or course..."
            className="w-full text-xs pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-auto">
            <select
              value={selectedCourseFilter}
              onChange={(e) => setSelectedCourseFilter(e.target.value)}
              className="w-full sm:w-auto text-xs bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-700 font-medium focus:outline-none focus:border-blue-500 pr-8 appearance-none cursor-pointer"
            >
              <option value="ALL">All Courses ({certificates.length})</option>
              {uniqueCourses.map((c, i) => (
                <option key={i} value={c}>{c}</option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100/80 border-b border-slate-200 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
              <th className="py-3.5 px-4 whitespace-nowrap">Certificate ID</th>
              <th className="py-3.5 px-4 whitespace-nowrap">Student Name</th>
              <th className="py-3.5 px-4">Course</th>
              <th className="py-3.5 px-4 whitespace-nowrap">Course Duration</th>
              <th className="py-3.5 px-4 whitespace-nowrap">Issue Date</th>
              <th className="py-3.5 px-4 text-right whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-medium">
            {filteredCertificates.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-slate-400">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <FileCheck className="w-8 h-8 text-slate-300 stroke-1" />
                    <p className="text-sm font-semibold">No certificates match your search.</p>
                    <p className="text-xs text-slate-400">Try adjusting your filters or search keywords.</p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredCertificates.map((cert) => (
                <tr 
                  key={cert.id} 
                  className="hover:bg-blue-50/40 transition-colors group cursor-pointer"
                  onClick={() => onView(cert)}
                >
                  <td className="py-3 px-4 whitespace-nowrap align-middle">
                    <span className="font-mono font-bold text-xs text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200 inline-block whitespace-nowrap">
                      {cert.id}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-900 text-sm whitespace-nowrap align-middle">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-100 border border-slate-200 shrink-0 flex items-center justify-center shadow-2xs">
                        <img
                          src={cert.photoUrl || '/id_card_assets/sample_student_photo.jpg'}
                          alt={cert.studentName}
                          className="w-full h-full"
                          style={{
                            objectFit: cert.photoFit || (cert.photoUrl?.includes('kousalya') ? 'contain' : 'cover'),
                            objectPosition: 'center top'
                          }}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/id_card_assets/sample_student_photo.jpg';
                          }}
                        />
                      </div>
                      <span>{cert.studentName}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-700 font-medium align-middle">
                    <div className="max-w-[280px] truncate" title={cert.courseName}>
                      {cert.courseName}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-600 font-medium whitespace-nowrap align-middle text-xs">
                    {cert.formattedDuration || '—'}
                  </td>
                  <td className="py-3 px-4 text-slate-600 font-medium whitespace-nowrap align-middle text-xs">
                    {cert.issueDate || cert.generatedDate || '—'}
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap align-middle" onClick={(e) => e.stopPropagation()}>
                    <div className="inline-flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => onView(cert)}
                        title="View Certificate"
                        className="p-1.5 hover:bg-slate-100 text-slate-600 hover:text-slate-900 rounded-lg transition-colors cursor-pointer"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onEdit(cert)}
                        title="Edit Certificate"
                        className="p-1.5 hover:bg-blue-50 text-blue-600 hover:text-blue-800 rounded-lg transition-colors cursor-pointer"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDuplicate(cert)}
                        title="Duplicate Certificate"
                        className="p-1.5 hover:bg-emerald-50 text-emerald-600 hover:text-emerald-800 rounded-lg transition-colors cursor-pointer"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete certificate ${cert.id}?`)) {
                            onDelete(cert.id);
                          }
                        }}
                        title="Delete Certificate"
                        className="p-1.5 hover:bg-red-50 text-red-600 hover:text-red-800 rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Info */}
      <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 font-medium">
        <span>Showing {filteredCertificates.length} of {certificates.length} certificate records</span>
        <span>Alpha Fly Education • Certification System</span>
      </div>
    </div>
  );
};
