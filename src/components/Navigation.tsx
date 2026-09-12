import { BarChart3, ClipboardList, Home as HomeIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

const links = [
  { label: "Home", to: "/", icon: HomeIcon },
  { label: "Transactions", to: "/transactions", icon: ClipboardList },
  { label: "Analytics", to: "/analytics", icon: BarChart3 },
];

function Navigation() {
  return (
    <nav
      aria-label="Primary navigation"
      className="fixed inset-x-0 bottom-0 z-40 border-t app-border app-surface px-4 py-2 lg:static lg:border-0 lg:bg-transparent lg:px-0 lg:py-0 lg:shadow-none"
    >
      <div className="mx-auto flex max-w-md items-center justify-around gap-2 lg:sticky lg:top-8 lg:block lg:max-w-none lg:space-y-2">
        {links.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition lg:justify-start lg:text-sm ${
                isActive
                  ? "app-primary-bg text-white shadow-sm"
                  : "app-muted hover:bg-(--app-surface-muted) hover:text-(--app-text)"
              }`
            }
          >
            <Icon size={18} aria-hidden="true" />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default Navigation;
