import React from 'react';
import {
  Users,
  GraduationCap,
  UserCheck,
  BookOpen,
  Building,
  FileCheck,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Clock,
  ShieldCheck,
  Sparkles,
  BarChart3,
  Circle,
  CheckCircle2,
  AlertTriangle,
  Search,
  MoreHorizontal,
  Plus,
  Settings,
  Activity,
  Award,
  FileText
} from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';

const adminStats = [
  { label: 'Total Students', value: '1,102', change: '+12.4%', trend: 'up', icon: GraduationCap, color: 'teal' },
  { label: 'Total Teachers', value: '86', change: '+4.2%', trend: 'up', icon: UserCheck, color: 'primary' },
  { label: 'Active Courses', value: '142', change: '+1.1%', trend: 'up', icon: BookOpen, color: 'amber' },
  { label: 'Assessments (AI)', value: '528', change: '+28.7%', trend: 'up', icon: Sparkles, color: 'success' },
];

const recentUsers = [
  { id: 'U-001', name: 'Jeanne Mukamana', email: 'jeanne.m@ur.ac.rw', role: 'Lecturer', dept: 'Computer Science', status: 'Active', joined: '2 days ago' },
  { id: 'U-002', name: 'Jean-Paul Niyonsaba', email: 'j.niyonsaba@ur.ac.rw', role: 'Student', dept: 'ICT Year 2', status: 'Active', joined: '3 days ago' },
  { id: 'U-003', name: 'Emmanuel Rwigamba', email: 'e.rwigamba@he.ac.rw', role: 'Admin', dept: 'Registrar', status: 'Active', joined: '1 week ago' },
  { id: 'U-004', name: 'Olive Uwase', email: 'o.uwase@gmail.com', role: 'Parent', dept: '—', status: 'Pending Auth', joined: '5 days ago' },
  { id: 'U-005', name: 'Faustin Habimana', email: 'f.habimana@ur.ac.rw', role: 'Student', dept: 'Medicine Year 3', status: 'Active', joined: '6 days ago' },
];

const departments = [
  { name: 'School of ICT', students: 412, teachers: 28, courses: 46, utilization: 92 },
  { name: 'Faculty of Medicine', students: 289, teachers: 34, courses: 38, utilization: 87 },
  { name: 'School of Business', students: 238, teachers: 14, courses: 32, utilization: 74 },
  { name: 'Faculty of Agriculture', students: 163, teachers: 10, courses: 26, utilization: 61 },
];

function SectionHeader({ eyebrow, title, subtitle, actionLabel, onAction, ActionIcon = Plus }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
      <div>
        {eyebrow && (
          <span className="eyebrow !mb-2 inline-flex mx-auto sm:mx-0">{eyebrow}</span>
        )}
        <h3 className="font-heading font-bold text-xl text-charcoal tracking-tight leading-tight">
          {title}
        </h3>
        {subtitle && (
          <p className="text-sm text-slategray mt-1.5 max-w-2xl">{subtitle}</p>
        )}
      </div>
      {actionLabel && (
        <button onClick={onAction} className="btn btn-primary">
          <ActionIcon className="w-4 h-4" />
          {actionLabel}
        </button>
      )}
    </div>
  );
}

function StatCard({ stat }) {
  const Icon = stat.icon;
  const colorMap = {
    teal: 'bg-teal-50 text-teal-600 border-teal-100',
    primary: 'bg-primary-50 text-primary border-primary-100',
    amber: 'bg-amber-50 text-amber-600 border-amber-100',
    success: 'bg-success-50 text-success border-success-100',
  };
  const trendMap = {
    up: 'text-success bg-success-50',
    down: 'text-red-600 bg-red-50',
  };
  const TrendIcon = stat.trend === 'up' ? ArrowUpRight : ArrowDownRight;
  return (
    <div className="card p-5 hover:shadow-cardLg transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${colorMap[stat.color]}`}>
          <Icon className="w-5 h-5" strokeWidth={2} />
        </div>
        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-bold ${trendMap[stat.trend]}`}>
          <TrendIcon className="w-3.5 h-3.5" />
          {stat.change}
        </div>
      </div>
      <div className="font-heading font-extrabold text-3xl text-charcoal tracking-tight leading-none mb-1">
        {stat.value}
      </div>
      <div className="text-sm text-slategray font-medium">{stat.label}</div>
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    'Active': 'bg-success-50 text-success border-success-200',
    'Pending Auth': 'bg-amber-50 text-amber-700 border-amber-200',
    'Suspended': 'bg-red-50 text-red-600 border-red-200',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold border ${map[status] || map.Active}`}>
      <Circle className="w-1.5 h-1.5 fill-current" />
      {status}
    </span>
  );
}

function RoleBadge({ role }) {
  const map = {
    'Student': 'badge-teal',
    'Lecturer': 'badge-primary',
    'Admin': 'badge-amber',
    'Parent': 'badge-success',
  };
  return <span className={`badge ${map[role] || 'badge-primary'}`}>{role}</span>;
}

// ============ ADMIN DASHBOARD ============
export function AdminDashboardView() {
  const { showToast, t } = useAppState();
  return (
    <div className="p-5 lg:p-8 space-y-8 max-w-[1400px] mx-auto">
      <SectionHeader
        eyebrow={t('adm.title')}
        title={t('admin.overview')}
        subtitle="University-wide performance, user activity, and AI assessment metrics across all colleges and departments."
        actionLabel={t('admin.runReport')}
        ActionIcon={BarChart3}
        onAction={() => showToast('Report', 'Generating institutional analytics report...', 'info')}
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {adminStats.map(s => <StatCard key={s.label} stat={s} />)}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* AI Adoption chart (mock bars) */}
        <div className="card p-5 lg:col-span-2">
          <div className="flex items-start justify-between mb-5">
            <div>
              <h4 className="font-heading font-bold text-lg text-charcoal leading-tight">
                AI Assessment Adoption This Semester
              </h4>
              <p className="text-sm text-slategray mt-1">{t('admin.aiAdoptionDesc')}</p>
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-teal-50 text-teal-700 text-xs font-bold border border-teal-200">
              <TrendingUp className="w-3.5 h-3.5" />
              +28.7%
            </div>
          </div>
          <div className="grid grid-cols-8 gap-2.5 items-end h-48">
            {[42, 55, 48, 68, 72, 85, 94, 100].map((h, i) => (
              <div key={i} className="flex flex-col items-center gap-2 group">
                <div className="w-full relative">
                  <div className="w-full text-[10px] font-bold text-slategray absolute -top-4 left-0 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                    {h * 5.28}
                  </div>
                  <div
                    className="w-full rounded-t-lg bg-gradient-to-t from-primary via-primary/80 to-teal/80 transition-all group-hover:from-primary-800 group-hover:to-teal"
                    style={{ height: `${h}%`, minHeight: '24px' }}
                  ></div>
                </div>
                <div className="text-[10px] font-semibold text-slategray -mt-1">
                  {['W1','W2','W3','W4','W5','W6','W7','W8'][i]}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t border-divider grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary-50 text-primary flex items-center justify-center">
                <FileCheck className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[11px] text-slategray">{t('admin.aiEvaluations')}</div>
                <div className="font-bold text-sm text-charcoal">528 done</div>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[11px] text-slategray">{t('admin.lecturerApproved')}</div>
                <div className="font-bold text-sm text-charcoal">92.4%</div>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-success-50 text-success flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[11px] text-slategray">{t('admin.avgTurnaround')}</div>
                <div className="font-bold text-sm text-charcoal">6.2 hrs → 48 min</div>
              </div>
            </div>
          </div>
        </div>

        {/* {t('admin.responsibleAI')} compliance */}
        <div className="card p-5 flex flex-col">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-base text-charcoal leading-tight">{t('admin.responsibleAI')}</h4>
              <p className="text-xs text-slategray mt-0.5">{t('admin.hecCompliance')}</p>
            </div>
          </div>

          <div className="relative w-full aspect-square max-w-[200px] mx-auto mb-5">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" stroke="#E2E8F0" strokeWidth="8" fill="none" />
              <circle cx="50" cy="50" r="42" stroke="#F5A623" strokeWidth="8" fill="none" strokeLinecap="round"
                      strokeDasharray={`${94 * 2.64} 264`} />
              <circle cx="50" cy="50" r="32" stroke="#2DD4BF" strokeWidth="8" fill="none" strokeLinecap="round"
                      strokeDasharray={`${97 * 2.01} 201`} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="font-heading font-extrabold text-3xl text-charcoal">94<span className="text-xl">%</span></div>
              <div className="text-[11px] text-slategray font-semibold">{t('admin.overallScore')}</div>
            </div>
          </div>

          <div className="space-y-2.5 mt-auto">
            {[
              { label: 'Human Oversight', v: 97, color: 'bg-teal' },
              { label: 'Explainability', v: 92, color: 'bg-primary' },
              { label: 'Fairness Audit', v: 88, color: 'bg-amber-400' },
              { label: 'Transparency Logs', v: 99, color: 'bg-success' },
            ].map(r => (
              <div key={r.label}>
                <div className="flex items-center justify-between text-[11px] font-semibold mb-1">
                  <span className="text-slategray">{r.label}</span>
                  <span className="text-charcoal">{r.v}%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-cream-200 overflow-hidden">
                  <div className={`h-full ${r.color} rounded-full`} style={{ width: `${r.v}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Departments + Recent users */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Departments */}
        <div className="card p-5 lg:col-span-2">
          <SectionHeader
            title={t('admin.deptUtilization')}
            subtitle={t('admin.deptAdoption')}
          />
          <div className="space-y-4">
            {departments.map(d => (
              <div key={d.name} className="p-3 rounded-xl border border-divider bg-cream-50/50 hover:bg-white dark:bg-slate-800 hover:shadow-card transition-all">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-primary-50 text-primary flex items-center justify-center">
                      <Building className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-charcoal leading-tight">{d.name}</div>
                      <div className="text-[11px] text-slategray">{d.teachers} teachers · {d.students} students</div>
                    </div>
                  </div>
                  <div className="font-heading font-extrabold text-lg text-primary">{d.utilization}%</div>
                </div>
                <div className="h-2 w-full rounded-full bg-divider overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-teal"
                    style={{ width: `${d.utilization}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent users */}
        <div className="card p-5 lg:col-span-3">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h4 className="font-heading font-bold text-lg text-charcoal leading-tight">
                {t('admin.recentUsers')}
              </h4>
              <p className="text-sm text-slategray mt-1">{t('admin.recentUsersDesc')}</p>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slategray" />
              <input
                type="text"
                placeholder={t('admin.searchUsers')}
                className="h-9 pl-9 pr-3 rounded-lg border border-divider bg-cream-50 text-[13px] text-charcoal placeholder:text-slategray/70 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 w-48"
              />
            </div>
          </div>

          <div className="overflow-x-auto -mx-5 -my-2">
            <table className="w-full text-left border-collapse min-w-full">
              <thead>
                <tr className="text-[11px] font-heading font-bold uppercase tracking-wider text-slategray bg-cream-50 border-y border-divider">
                  <th className="py-2.5 px-5"> {t('admin.colUser')} </th>
                  <th className="py-2.5 px-3"> {t('admin.colRole')} </th>
                  <th className="py-2.5 px-3"> {t('admin.colDept')} </th>
                  <th className="py-2.5 px-3"> {t('admin.colStatus')} </th>
                  <th className="py-2.5 px-3"> {t('admin.colJoined')} </th>
                  <th className="py-2.5 px-5 w-10"></th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map(u => (
                  <tr key={u.id} className="border-b border-divider last:border-b-0 hover:bg-cream-50/70 transition-colors">
                    <td className="py-3 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-primary text-white flex items-center justify-center font-heading font-bold text-sm">
                          {u.name.split(' ').map(n=>n[0]).slice(0,2).join('')}
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-sm text-charcoal leading-tight truncate">{u.name}</div>
                          <div className="text-[11px] text-slategray truncate">{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3"><RoleBadge role={u.role} /></td>
                    <td className="py-3 px-3 text-sm text-slategray">{u.dept}</td>
                    <td className="py-3 px-3"><StatusBadge status={u.status} /></td>
                    <td className="py-3 px-3 text-sm text-slategray">{u.joined}</td>
                    <td className="py-3 px-5 text-right">
                      <button className="w-8 h-8 rounded-lg text-slategray hover:bg-cream-200 hover:text-midnight inline-flex items-center justify-center">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-5 flex items-center justify-between pt-3 border-t border-divider">
            <div className="text-xs text-slategray">Showing {recentUsers.length} of 1,284 users</div>
            <button onClick={() => showToast('Users', 'Opening full user directory...', 'info')} className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1">
              {t('admin.viewAllUsers')} <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ GENERIC LIST VIEW ============
function SimpleListView({ icon, title, subtitle, items, itemFields, badgeKey, statusKey, emptyMsg }) {
  const Icon = icon;
  return (
    <div className="p-5 lg:p-8 space-y-6 max-w-[1400px] mx-auto">
      <SectionHeader
        eyebrow="Management"
        title={title}
        subtitle={subtitle}
        actionLabel={`New ${title.slice(0, -1)}`}
      />
      <div className="card p-5 lg:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slategray" />
            <input
              type="text"
              placeholder={`Search ${title.toLowerCase()}...`}
              className="w-full h-11 pl-11 pr-4 rounded-xl border border-divider bg-white dark:bg-slate-800 text-charcoal placeholder:text-slategray/70 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary text-[14px]"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="btn btn-secondary">
              <Activity className="w-4 h-4" /> Filters
            </button>
            <button className="btn btn-secondary">
              <FileText className="w-4 h-4" /> Export
            </button>
          </div>
        </div>
        {items && items.length > 0 ? (
          <div className="overflow-x-auto -mx-5 lg:-mx-6">
            <table className="w-full text-left border-collapse min-w-full">
              <thead>
                <tr className="text-[11px] font-heading font-bold uppercase tracking-wider text-slategray bg-cream-50 border-y border-divider">
                  {itemFields.map(f => (
                    <th key={f.key} className={`py-3 px-5 ${f.align === 'right' ? 'text-right' : ''}`}>{f.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((item, idx) => (
                  <tr key={item.id || idx} className="border-b border-divider last:border-b-0 hover:bg-cream-50/70 transition-colors">
                    {itemFields.map(f => {
                      if (f.key === 'name') {
                        return (
                          <td key={f.key} className="py-3.5 px-5">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-lg bg-primary-50 text-primary flex items-center justify-center">
                                <Icon className="w-4.5 h-4.5" />
                              </div>
                              <div className="min-w-0">
                                <div className="font-semibold text-sm text-charcoal leading-tight truncate">{item[f.key]}</div>
                                {item.sub && <div className="text-[11px] text-slategray truncate">{item.sub}</div>}
                              </div>
                            </div>
                          </td>
                        );
                      }
                      if (f.key === badgeKey) {
                        return <td key={f.key} className="py-3.5 px-5"><RoleBadge role={item[f.key]} /></td>;
                      }
                      if (f.key === statusKey) {
                        return <td key={f.key} className="py-3.5 px-5"><StatusBadge status={item[f.key]} /></td>;
                      }
                      if (f.key === 'action') {
                        return (
                          <td key={f.key} className="py-3.5 px-5 text-right">
                            <button className="w-8 h-8 rounded-lg text-slategray hover:bg-cream-200 hover:text-midnight inline-flex items-center justify-center">
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                          </td>
                        );
                      }
                      return (
                        <td key={f.key} className={`py-3.5 px-5 text-sm ${f.align === 'right' ? 'text-right font-semibold text-charcoal' : 'text-slategray'}`}>
                          {item[f.key]}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-16 text-center">
            <div className="w-16 h-16 rounded-2xl bg-cream-100 text-slategray flex items-center justify-center mx-auto mb-4">
              <Icon className="w-7 h-7" />
            </div>
            <h4 className="font-heading font-bold text-lg text-charcoal mb-1">{emptyMsg || 'No items yet'}</h4>
            <p className="text-sm text-slategray mb-4 max-w-md mx-auto">
              Click "New {title.slice(0, -1)}" to add your first entry, or contact system administration for access.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ============ USERS ============
export function AdminUsersView() {
  const items = recentUsers.map(u => ({
    ...u,
    sub: u.email,
  }));
  return (
    <SimpleListView
      icon={Users}
      title="All Users"
      subtitle="Manage every user account across the institution, including students, lecturers, admins, and guardians."
      items={items}
      itemFields={[
        { key: 'name', label: 'User' },
        { key: 'role', label: 'Role' },
        { key: 'dept', label: 'Department' },
        { key: 'status', label: 'Status' },
        { key: 'joined', label: 'Joined' },
        { key: 'action', label: '', align: 'right' },
      ]}
      badgeKey="role"
      statusKey="status"
    />
  );
}

// ============ STUDENTS ============
const studentsList = [
  { id: 'S001', name: 'Jean-Paul Niyonsaba', sub: 'j.niyonsaba@ur.ac.rw', role: 'Student', dept: 'School of ICT', status: 'Active', joined: '2024', year: 'Year 2', idnum: '2024-ICT-001' },
  { id: 'S002', name: 'Aline Uwimana', sub: 'a.uwimana@ur.ac.rw', role: 'Student', dept: 'Medicine', status: 'Active', joined: '2023', year: 'Year 3', idnum: '2023-MED-048' },
  { id: 'S003', name: 'Faustin Habimana', sub: 'f.habimana@ur.ac.rw', role: 'Student', dept: 'Medicine', status: 'Active', joined: '2022', year: 'Year 3', idnum: '2022-MED-112' },
  { id: 'S004', name: 'Marie Claire Ishimwe', sub: 'mc.ishimwe@ur.ac.rw', role: 'Student', dept: 'Business', status: 'Active', joined: '2024', year: 'Year 1', idnum: '2024-BUS-067' },
  { id: 'S005', name: 'Eric Tuyishime', sub: 'e.tuyishime@ur.ac.rw', role: 'Student', dept: 'Agriculture', status: 'Pending Auth', joined: '2025', year: 'Year 1', idnum: '2025-AGR-033' },
  { id: 'S006', name: 'Sarah Ingabire', sub: 's.ingabire@ur.ac.rw', role: 'Student', dept: 'School of ICT', status: 'Active', joined: '2023', year: 'Year 4', idnum: '2023-ICT-145' },
];
export function AdminStudentsView() {
  const items = studentsList;
  return (
    <SimpleListView
      icon={GraduationCap}
      title="Students"
      subtitle="Student records, enrollment, IDs, faculties, and performance summary access."
      items={items}
      itemFields={[
        { key: 'name', label: 'Student' },
        { key: 'idnum', label: 'Student ID' },
        { key: 'year', label: 'Year' },
        { key: 'dept', label: 'School' },
        { key: 'status', label: 'Status' },
        { key: 'action', label: '', align: 'right' },
      ]}
      badgeKey="role"
      statusKey="status"
    />
  );
}

// ============ TEACHERS ============
const teachersList = [
  { id: 'T001', name: 'Dr. Jeanne Mukamana', sub: 'jmukamana@ur.ac.rw', role: 'Lecturer', dept: 'Computer Science', status: 'Active', joined: '2019', courses: '4' },
  { id: 'T002', name: 'Prof. Aimable Nsabimana', sub: 'ansabimana@ur.ac.rw', role: 'Lecturer', dept: 'Medicine', status: 'Active', joined: '2012', courses: '3' },
  { id: 'T003', name: 'Dr. Claire Ishimwe', sub: 'cishimwe@ur.ac.rw', role: 'Lecturer', dept: 'Business', status: 'Active', joined: '2021', courses: '5' },
  { id: 'T004', name: 'Mr. David Habarurema', sub: 'dhabarurema@ur.ac.rw', role: 'Lecturer', dept: 'Agriculture', status: 'Active', joined: '2020', courses: '3' },
  { id: 'T005', name: 'Dr. Paul Rwibasira', sub: 'prwibasira@ur.ac.rw', role: 'Lecturer', dept: 'Computer Science', status: 'Pending Auth', joined: '2025', courses: '2' },
];
export function AdminTeachersView() {
  return (
    <SimpleListView
      icon={UserCheck}
      title="Teachers / Lecturers"
      subtitle="Teaching staff, departments, course loads, and AI rubric management access."
      items={teachersList}
      itemFields={[
        { key: 'name', label: 'Lecturer' },
        { key: 'dept', label: 'Department' },
        { key: 'courses', label: 'Courses', align: 'right' },
        { key: 'joined', label: 'Since' },
        { key: 'status', label: 'Status' },
        { key: 'action', label: '', align: 'right' },
      ]}
      badgeKey="role"
      statusKey="status"
    />
  );
}

// ============ COURSES ============
const coursesList = [
  { id: 'C001', name: 'Software Engineering', sub: 'Dr. Jeanne Mukamana', role: 'Lecturer', dept: 'Computer Science', status: 'Active', joined: 'ICT Year 2', idnum: 'CSE-201' },
  { id: 'C002', name: 'Data Structures & Algorithms', sub: 'Dr. Paul Rwibasira', role: 'Lecturer', dept: 'Computer Science', status: 'Active', joined: 'ICT Year 2', idnum: 'CSE-204' },
  { id: 'C003', name: 'Human Anatomy I', sub: 'Prof. Aimable Nsabimana', role: 'Lecturer', dept: 'Medicine', status: 'Active', joined: 'Medicine Year 1', idnum: 'MED-110' },
  { id: 'C004', name: 'Microeconomics', sub: 'Dr. Claire Ishimwe', role: 'Lecturer', dept: 'Business', status: 'Active', joined: 'Business Year 2', idnum: 'BUS-230' },
  { id: 'C005', name: 'Sustainable Agriculture', sub: 'Mr. David Habarurema', role: 'Lecturer', dept: 'Agriculture', status: 'Active', joined: 'Agri Year 3', idnum: 'AGR-340' },
  { id: 'C006', name: 'Intro to Environmental Studies', sub: 'Dr. Jeanne Mukamana', role: 'Lecturer', dept: 'CST — Env.', status: 'Active', joined: 'All Year 1', idnum: 'ENV-101' },
];
export function AdminCoursesView() {
  return (
    <SimpleListView
      icon={BookOpen}
      title="Courses & Modules"
      subtitle="All active courses, modules, assigned lecturers, and their rubric templates."
      items={coursesList}
      itemFields={[
        { key: 'name', label: 'Course' },
        { key: 'idnum', label: 'Code' },
        { key: 'joined', label: 'Cohort' },
        { key: 'dept', label: 'Department' },
        { key: 'status', label: 'Status' },
        { key: 'action', label: '', align: 'right' },
      ]}
      badgeKey="role"
      statusKey="status"
    />
  );
}

// ============ DEPARTMENTS ============
export function AdminDepartmentsView() {
  const items = departments.map((d, i) => ({
    id: `D${i}`,
    name: d.name,
    sub: `${d.teachers} teachers · ${d.students} students`,
    role: 'Admin',
    dept: `${d.courses} courses`,
    status: d.utilization >= 85 ? 'Active' : d.utilization >= 65 ? 'Active' : 'Pending Auth',
    joined: `${d.utilization}% adopted`,
    idnum: `DEP-00${i+1}`,
  }));
  return (
    <SimpleListView
      icon={Building}
      title="Departments & Faculties"
      subtitle="University structure, department heads, course counts, and utilization metrics."
      items={items}
      itemFields={[
        { key: 'name', label: 'Department' },
        { key: 'idnum', label: 'Code' },
        { key: 'dept', label: 'Courses' },
        { key: 'joined', label: 'AI Adoption' },
        { key: 'status', label: 'Status' },
        { key: 'action', label: '', align: 'right' },
      ]}
      badgeKey="role"
      statusKey="status"
    />
  );
}

// ============ ASSESSMENTS ============
const assessmentsList = [
  { id: 'A001', name: 'ENV-101 Midterm Assignment', sub: 'Dr. Jeanne Mukamana · 130 submissions', role: 'Student', dept: 'Environmental Studies', status: 'Active', joined: 'Due Oct 28', idnum: 'AI Scored' },
  { id: 'A002', name: 'CSE-201 Lab Project #3', sub: 'Dr. Paul Rwibasira · 68 submissions', role: 'Student', dept: 'Software Eng.', status: 'Active', joined: 'Due Nov 02', idnum: 'AI Scored' },
  { id: 'A003', name: 'MED-110 Practical Report', sub: 'Prof. Aimable Nsabimana · 89 submissions', role: 'Student', dept: 'Medicine', status: 'Pending Auth', joined: 'Grading', idnum: 'Lecturer Review' },
  { id: 'A004', name: 'BUS-230 Case Study', sub: 'Dr. Claire Ishimwe · 52 submissions', role: 'Student', dept: 'Business', status: 'Active', joined: 'Due Nov 05', idnum: 'AI Scored' },
  { id: 'A005', name: 'AGR-340 Field Work Report', sub: 'Mr. David Habarurema · 34 submissions', role: 'Student', dept: 'Agriculture', status: 'Active', joined: 'Submitted', idnum: 'Queued' },
];
export function AdminAssessmentsView() {
  return (
    <SimpleListView
      icon={FileCheck}
      title="Assessments"
      subtitle="All assignments and assessments system-wide, including rubrics, AI-evaluation status, and the lecturer review pipeline."
      items={assessmentsList}
      itemFields={[
        { key: 'name', label: 'Assessment' },
        { key: 'idnum', label: 'Stage' },
        { key: 'dept', label: 'Course' },
        { key: 'joined', label: 'Timeline' },
        { key: 'status', label: 'Status' },
        { key: 'action', label: '', align: 'right' },
      ]}
      badgeKey="role"
      statusKey="status"
    />
  );
}

// ============ ANALYTICS ============
export function AdminAnalyticsView() {
  return (
    <div className="p-5 lg:p-8 space-y-8 max-w-[1400px] mx-auto">
      <SectionHeader
        eyebrow="Institutional Analytics"
        title="Performance & Insights"
        subtitle="Aggregated analytics across all departments, including AI adoption, assessment quality, and lecturer turnaround times."
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        {[
          { lbl: 'Avg. Student Satisfaction', val: '4.6/5', ic: Award, c: 'teal', sub: 'Based on 1,428 feedback responses' },
          { lbl: 'Avg. Lecturer Time Saved', val: '6.2 hrs', ic: Clock, c: 'primary', sub: 'Per 100-submission assignment batch' },
          { lbl: 'Grade Consistency (AI vs. Lecturer)', val: '94.1%', ic: CheckCircle2, c: 'success', sub: 'Similarity of scores after review' },
        ].map(s => {
          const Ic = s.ic;
          const cm = { teal:'bg-teal-50 text-teal-600 border-teal-100', primary:'bg-primary-50 text-primary border-primary-100', success:'bg-success-50 text-success border-success-100' };
          return (
            <div key={s.lbl} className="card p-5">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center border mb-4 ${cm[s.c]}`}>
                <Ic className="w-5 h-5" />
              </div>
              <div className="font-heading font-extrabold text-3xl text-charcoal tracking-tight leading-none mb-1">{s.val}</div>
              <div className="text-sm font-semibold text-charcoal mb-1">{s.lbl}</div>
              <div className="text-xs text-slategray">{s.sub}</div>
            </div>
          );
        })}
      </div>
      <div className="card p-6">
        <div className="w-full h-72 bg-cream-dot rounded-xl border border-dashed border-divider flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="w-12 h-12 text-slategray mx-auto mb-3" />
            <h4 className="font-heading font-bold text-lg text-charcoal mb-1">Interactive Analytics Panel</h4>
            <p className="text-sm text-slategray max-w-md">
              Full institutional analytics visualizations, including grade distributions, department comparisons, responsible AI bias audits, and lecturer performance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ SYSTEM SETTINGS ============
export function AdminSettingsView() {
  const settingGroups = [
    { title: 'Institution Profile', desc: 'University name, logo, branding, and HEC registration details.' },
    { title: 'User Roles & Permissions', desc: 'Fine-grained access control for each role type.' },
    { title: 'Responsible AI Configuration', desc: 'Confidence thresholds, human-in-the-loop rules, fairness guardrails.' },
    { title: 'Email & Notifications', desc: 'Institutional SMTP, email templates, notification triggers.' },
    { title: 'Integrations', desc: 'University portal (MIS) SSO, LMS (Moodle), Google Workspace.' },
    { title: 'Security & Audit Logs', desc: 'Session policies, 2FA, activity logs, and compliance exports.' },
  ];
  return (
    <div className="p-5 lg:p-8 space-y-6 max-w-[1100px] mx-auto">
      <SectionHeader
        eyebrow="Administration"
        title="System Settings"
        subtitle="Configure platform-wide settings, security policies, and institutional preferences."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {settingGroups.map(sg => (
          <div key={sg.title} className="card p-5 flex items-start gap-4 cursor-pointer hover:shadow-cardLg transition-all group">
            <div className="w-11 h-11 rounded-xl bg-primary-50 text-primary flex items-center justify-center border border-primary-100 group-hover:bg-primary group-hover:text-white transition-all">
              <Settings className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-heading font-bold text-base text-charcoal leading-tight mb-1 group-hover:text-primary transition-colors">
                {sg.title}
              </h4>
              <p className="text-sm text-slategray leading-relaxed">{sg.desc}</p>
            </div>
            <ChevronRightLike className="w-5 h-5 text-slategray group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
          </div>
        ))}
      </div>
      <div className="mt-8 card p-5 border-amber-200 bg-amber-50/40">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-heading font-bold text-base text-amber-900 leading-tight mb-1">Prototype Notice</h4>
            <p className="text-sm text-amber-800 leading-relaxed">
              This is a demo prototype. Settings changes above are illustrative and not persisted.
              In production, admin actions will be logged to the audit trail and require re-authentication for sensitive operations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChevronRightLike(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m9 18 6-6-6-6"/>
    </svg>
  );
}
