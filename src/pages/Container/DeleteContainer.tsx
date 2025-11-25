import DeleteDialog from "../../components/common/DeleteDialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useToast from "../../hooks/useToast";
import { deleteContainerAPI } from "../../api/container";
import { DeleteIcon } from "../../components/common/icons";
import { useTranslation } from "react-i18next";

const DeleteContainer: React.FC<{
  showDeleteModal: boolean;
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  deleteContainerId: string;
}> = ({ showDeleteModal, setShowDeleteModal, deleteContainerId }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const deleteMutation = useMutation({
    mutationFn: deleteContainerAPI,
    onSuccess: (res) => {
      useToast(res.message);
      queryClient.invalidateQueries({ queryKey: ["listContainer"] });
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
          deleteMutation.mutate(deleteContainerId);
        }}
        title={t("container.deleteContainer")}
        message={t("container.sureDeleteContainer")}
        confirmText={t("common.delete")}
        cancelText={t("common.Cancel")}
        isLoading={deleteMutation.isPending}
        modalImage={<DeleteIcon className="h-24" />}
      />
    </>
  );
};

export default DeleteContainer;
