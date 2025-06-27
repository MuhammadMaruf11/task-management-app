import EditTask from "@/components/Task/EditTask/EditTask";

export default function EditTaskPage({ params }: { params: { id: string } }) {
    console.log('[aram]', params);
    return <EditTask taskId={params.id} />;
}
