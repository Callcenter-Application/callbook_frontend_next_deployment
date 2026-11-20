import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { CreateUserForm } from "@/components/users/CreateUserForm";

export const metadata: Metadata = { title: "Create user" };

export default function CreateUserPage() {
  return (
    <>
      <PageHeader title="Create user" subtitle="Add a new supervisor, operator or administrator" />
      <CreateUserForm />
    </>
  );
}
