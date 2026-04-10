import { Bell, Settings, Search } from 'lucide-react';

export default function TopBar() {
  return (
    <header className="fixed top-0 left-0 right-0 h-20 bg-slate-100/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 z-50 px-12 flex justify-between items-center">
      <div className="flex items-center gap-8">
        <span className="text-xl font-bold tracking-tight text-blue-950 dark:text-white font-headline">
        </span>
        <nav className="hidden md:flex items-center gap-6 font-body tracking-tight">
          <NavLink label="Dashboard" />
          <NavLink label="ECR Tracker" />
          <NavLink label="Simulations" />
          <NavLink label="Archive" />
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-500 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
          <Bell size={20} />
        </button>
        <button className="p-2 text-slate-500 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
          <Settings size={20} />
        </button>
        <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden border border-slate-300 dark:border-slate-600">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3RvhMjARJxLjp7Dd_Mv7k8CpTVmvrV_57Qx_QU5H-SVNZeHJ8jnxK4FH7_qNFLURrLRFHLLnOmpTSJXpGVsSX3aZFBSFONF7JXD5F1O8pbozQU-uNXkVilHTipLdQgohd36D-nva3yH-58gi59kdM-oFF0sveeG58o9Eood-au0_6HUAWR0ppY51loDaV79M-_1jMAIcvHmQQabgUzDIuJnYUAjMTwczdVFD_bC6hkG-N9c6tYqvq0UnxGUJCIW5uhFsHFafmHDZG" 
            alt="User avatar" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </header>
  );
}

function NavLink({ label }: { label: string }) {
  return (
    <a href="#" className="text-slate-500 dark:text-slate-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
      {label}
    </a>
  );
}
