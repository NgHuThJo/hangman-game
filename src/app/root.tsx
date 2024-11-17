import { Outlet } from "react-router-dom";
import { PageLayout } from "#frontend/components/layouts/page/page";

export function AppRoot() {
  return (
    <PageLayout>
      <Outlet />
    </PageLayout>
  );
}
