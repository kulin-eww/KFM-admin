import DeleteDialog from "../../components/common/DeleteDialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useToast from "../../hooks/useToast";
import { DeleteIcon } from "../../components/common/icons";
import { useTranslation } from "react-i18next";
import { deleteZoneAPI } from "../../api/zone";

const DeleteZone: React.FC<{
  showDeleteModal: boolean;
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  deleteZoneId: string;
}> = ({ showDeleteModal, setShowDeleteModal, deleteZoneId }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const deleteMutation = useMutation({
    mutationFn: deleteZoneAPI,
    onSuccess: (res) => {
      useToast(res.message);
      queryClient.invalidateQueries({ queryKey: ["listZone"] });
      setShowDeleteModal(false);
    },
    onError: (error) => {
      useToast(error.message, "error");
    },
  });

  return (
    <>
      <DeleteDialog
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => {
          deleteMutation.mutate(deleteZoneId);
        }}
        title={t("zoneManagement.deleteZone.title")}
        message={t("zoneManagement.deleteZone.message")}
        confirmText={t("common.delete")}
        cancelText={t("common.Cancel")}
        isLoading={deleteMutation.isPending}
        modalImage={<DeleteIcon className="h-24" />}
      />
    </>
  );
};

export default DeleteZone;
