import DeleteDialog from "../../components/common/DeleteDialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useToast from "../../hooks/useToast";
import { deleteDriverAPI } from "../../api/driver";
import { DeleteIcon } from "../../components/common/icons";
import { useTranslation } from "react-i18next";
const DeleteDriver: React.FC<{
  showDeleteModal: boolean;
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  deleteDriverId: string;
}> = ({ showDeleteModal, setShowDeleteModal, deleteDriverId }) => {
  const queryClient = useQueryClient();
  const { t, i18n } = useTranslation();
  const deleteMutation = useMutation({
    mutationFn: deleteDriverAPI,
    onSuccess: (res) => {
      useToast(res.message);
      queryClient.invalidateQueries({ queryKey: ["listDriver"] });
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
          deleteMutation.mutate(deleteDriverId);
        }}
        title={t("driver.deleteDriver")}
        message={t("driver.confirm")}
        confirmText={t("common.delete")}
        cancelText={t("common.Cancel")}
        isLoading={deleteMutation.isPending}
        modalImage={<DeleteIcon className="h-24" />}
      />
    </>
  );
};

export default DeleteDriver;
