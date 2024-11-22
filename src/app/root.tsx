import { Outlet, useLocation } from "react-router-dom";
import { PageLayout } from "#frontend/components/layouts/page/page";

export function AppRoot() {
  const location = useLocation();

  return (
    <PageLayout>
      <Outlet key={location.key} />
    </PageLayout>
  );
}
