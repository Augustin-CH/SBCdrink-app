import { useFormik } from 'formik';
import * as yup from 'yup';
import {Box, Button, Modal, TextField, Typography} from "@mui/material";
import {FC, useState} from "react";
import {IBaseCocktail} from "@features/cocktail/type";
import {useAppDispatch, useAppSelector} from "@app/hooks";
import {RootState} from "@app/store";
import {FetchStatus} from "@app/shared/types";
import {AxiosError} from "axios";
import {useNavigate} from "react-router-dom";

const validationSchema = yup.object({

});

interface CocktailFormProps {
    mode: "add" | "edit" | "view";
    className?: string;
    cocktail?: IBaseCocktail;
    request: (values: any) => void;
    title: string;
    submitText: string;
    notificationSuccess: string;
    notificationError: string;
}

const CocktailForm: FC<CocktailFormProps> = ({
     mode,
     className,
     cocktail,
     request,
     title,
     submitText,
     notificationSuccess,
     notificationError,
}) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [requestStatus, setRequestStatus] = useState<FetchStatus>('idle')
    const [isModalOpen, setIsModalOpen] = useState(false);

    const formik = useFormik({
        initialValues: cocktail || {} as IBaseCocktail,
        validationSchema: validationSchema,
        onSubmit: async (values: any) => {
            if (requestStatus === 'idle') {
                try {
                    setRequestStatus('loading')
                    // @ts-ignore
                    await dispatch(request(values)).unwrap()
                    onReset()
                    // dispatch(showNotification({
                    //     ...notificationSuccess,
                    //     type: "success"
                    // }))
                    // mode === "add" && navigate(`/promotions/${values.reference}`)
                } catch (e: AxiosError | any) {
                    // dispatch(showNotification({
                    //     ...notificationError,
                    //     type: "error"
                    // }))
                } finally {
                    setRequestStatus('idle')
                }
            }
        }
    })

    const onReset = () => {
        formik.resetForm()
    };

    return (
        <Modal
            open={isModalOpen}
            onClose={setIsModalOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className={className}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {title}
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        fullWidth
                        id="name"
                        name="name"
                        label="Name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />

                    <Button color="primary" variant="contained" fullWidth type="submit">
                        {submitText}
                    </Button>
                </form>
            </Box>
        </Modal>
    )
}

export default CocktailForm;