import { memo } from "react"
import Form from "../../forms/components/Form"
import Input from "../../forms/components/Input"
import ROUTES from "../../routes/routesModel"
import { arrayOf, func, node, object, string } from "prop-types"

const CardForm = ({
    onSubmit,
    onReset,
    errors,
    onFormChange,
    onInputChange,
    data,
    title,
    inputs,
    children
}) => {
    return (

        <Form
            onSubmit={onSubmit}
            onChange={onFormChange}
            onReset={onReset}
            styles={{ maxWidth: "800px" }}
            title={title}
            to={ROUTES.CARDS}>
            {
                inputs.map((input, index) => (
                    <Input
                        key={index}
                        {...input}
                        data={data}
                        error={errors[input.name]}
                        onChange={onInputChange}
                        sm={6}
                    />
                ))
            }
            {children}
        </Form>
    )
}


CardForm.propTypes = {
    onSubmit: func.isRequired,
    onReset: func.isRequired,
    errors: object,
    onFormChange: func.isRequired,
    onInputChange: func.isRequired,
    data: object.isRequired,
    title: string.isRequired,
    inputs: arrayOf(object).isRequired,
    children: node
};
export default memo(CardForm);