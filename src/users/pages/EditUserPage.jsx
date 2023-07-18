import { Navigate, useNavigate } from "react-router-dom";
import useUsers from "../../users/hooks/useUsers";
import { useUser } from "../../users/providers/UserProvider";
import useForm from "../../forms/hooks/useForm";


import { useEffect } from "react";
import ROUTES from "../../routes/routesModel";
import { Checkbox, Container, FormControlLabel, Grid } from "@mui/material";
import CardForm from "../../cards/components/CardForm";
import initalEditUserForm from "../helpers/initialForms/initalEditUserForm";
import editUserSchema from "../models/joi-schema/editUserSchema";
import normalizeEditUser from "../helpers/normalization/normalizeEditUser";
import mapUserToModel from "../helpers/normalization/mapUserToModel";

const EditUserPage = () => {
    const {
        handleEditUser,
        handleGetUser,
    } = useUsers();

    const { user } = useUser();
    const navigate = useNavigate();

    const { value, ...rest } = useForm(
        initalEditUserForm,
        editUserSchema,
        () => {
            handleEditUser(user._id, {
                ...normalizeEditUser(value.formData),
                isAdmin: user.isAdmin,
            });
        }
    );

    useEffect(() => {
        handleGetUser(user._id).then((data) => {
            console.log(data);
            if (data._id !== user._id) return navigate(ROUTES.CARDS);
            const modeledUser = mapUserToModel(data);
            rest.setFormData(modeledUser);
        });
    }, []);

    if (!user) return <Navigate replace to={ROUTES.CARDS} />;
    const inputFactory = (name, label, required, type) => ({
        name,
        label,
        required,
        type,
    });
    const mapInputs = [
        inputFactory("first", "first name", true, "text"),
        inputFactory("middle", "middle name", false, "text"),
        inputFactory("last", "last name", true, "text"),
        inputFactory("phone", "phone", true, "phone"),
        inputFactory("email", "email", true, "email"),
        inputFactory("url", "image url", false, "text"),
        inputFactory("alt", "image alt", false, "text"),
        inputFactory("state", "state", false, "text"),
        inputFactory("country", "country", true, "text"),
        inputFactory("city", "city", true, "text"),
        inputFactory("street", "street", true, "text"),
        inputFactory("houseNumber", "houseNumber", true, "number"),
        inputFactory("zip", "zip", false, "number"),
    ];
    return (
        <Container
            sx={{
                paddingTop: 8,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <CardForm
                title="Edit User"
                onSubmit={rest.onSubmit}
                onReset={rest.handleReset}
                errors={value.errors}
                onFormChange={rest.validateForm}
                onInputChange={rest.handleChange}
                data={value.formData}
                inputs={mapInputs}
            >
                <Grid item>
                    <FormControlLabel
                        onChange={(e) => rest.setFormData({
                            ...value.formData,
                            isBusiness: !!e.target.checked
                        })}
                        name="isBusiness"
                        control={<Checkbox checked={value.formData.isBusiness} color="primary" />}
                        label="Signup as Business"
                    >
                    </FormControlLabel>
                </Grid>
            </CardForm>
        </Container>
    );
};

export default EditUserPage;