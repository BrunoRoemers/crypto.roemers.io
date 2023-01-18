import { ReactNode } from "react";

interface Props {
  label?: string;
  errorMessages?: string[];
  children: ReactNode;
  htmlFor?: string;
}

const FormRow = ({ label, errorMessages, children, htmlFor }: Props) => {
  const hasLabel = label !== undefined;
  const hasErrors = errorMessages !== undefined && errorMessages.length > 0;

  const content = (
    <>
      <div>{children}</div>
      {!hasErrors ? null : (
        <ul className="text-red-600">
          {errorMessages.map((errorMessage, i) => (
            <li key={1}>{errorMessage}</li>
          ))}
        </ul>
      )}
    </>
  );

  const wrapperClx = "w-full flex px-2 py-1";

  return hasLabel ? (
    // NOTE: Since the component's children are rendered inside a label,
    //       they are implicitly linked (no need for htmlFor and id).
    //       However, the user of this component can provide an explicit htmlFor in case of conflict.
    <label className={wrapperClx} htmlFor={htmlFor}>
      <div className="w-1/3 pt-1">{label}</div>
      <div className="w-2/3">{content}</div>
    </label>
  ) : (
    <div className={wrapperClx}>
      <div className="w-2/3 ml-1/3">{content}</div>
    </div>
  );
};

export default FormRow;
