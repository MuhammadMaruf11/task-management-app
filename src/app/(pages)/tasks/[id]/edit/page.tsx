import EditTask from "@/components/Task/EditTask/EditTask";

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const id = (await params).id
    return <EditTask taskId={id} />;
}
