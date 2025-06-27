import ViewTaskPage from "@/components/Task/ViewTask/ViewTask";

export default async function TaskPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const id = (await params).id
    return <ViewTaskPage taskId={id} />;
}
