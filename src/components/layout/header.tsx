import { NavbarAdmin } from "../website/comman/super-admin-header";


export default function SuperAdminHeader() {
  return (
    <header className="sticky inset-x-0 top-0 w-full left-0">
      <nav className="w-full shadow z-100">
        <div>
          <NavbarAdmin />
        </div>
      </nav>
    </header>
  )
}
