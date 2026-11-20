import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { UsersView } from "@/components/users/UsersView";
import { PlusIcon } from "@/icons";

export const metadata: Metadata = { title: "Users" };

export default function UsersPage() {
  return (
    <>
      <PageHeader title="Users" subtitle="Manage supervisors, agents and administrators">
        <ButtonLink href="/users/new">
          <PlusIcon size={16} />
          Create user
        </ButtonLink>
      </PageHeader>
      <UsersView />
    </>
  );
}
