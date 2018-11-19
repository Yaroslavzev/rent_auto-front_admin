import React from "react";

const FormField = ({ formdata, id, change, className, options }) => {
  const showError = () => {
    let errorMessage = (
      <div className="error_label">
        {formdata.validation && !formdata.valid
          ? formdata.validationMessage
          : null}
      </div>
    );

    return errorMessage;
  };

  const formTemplate = () => {
    let template = null;
    switch (formdata.element) {
      case "input":
        template = (
          <div>
            {formdata.showLabel ? (
              <div className="car_edit_label">{formdata.config.label}</div>
            ) : null}
            <input className={className}
              {...formdata.config}
              value={formdata.value}
              onChange={event => change({ event, id })}
            />
            {showError()}
          </div>
        );
        break;
        case "select":
        template = (
          <div>
            {formdata.showLabel ? (
              <div className="car_edit_label">{formdata.config.label}</div>
            ) : null}
            <select className={className}
              {...formdata.config}
              value={formdata.value}
              onChange={event => change({ event, id })}
            >
            {options.map((item, i)=>(
              <option key={i} value={item.name}>{item.name}</option>
            ))}
            </select>
            {showError()}
          </div>
        );
        break;
      default:
        template = null;
    }
    return template;
  };
  return <div>{formTemplate()}</div>;
};

export default FormField;
