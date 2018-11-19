import React, { Component } from "react";
import AdminLayout from "../../../hoc/adminLayout";
import FormField from "../../../UI/formField";
import { validate } from "../../../UI/misc";
import "./carInfo.css";
import axios from "axios";

class CarInfo extends Component {
  state = {
    formType: "Edit",
    carId: "",
    formSubmit: false,
    formError: false,
    formSuccess: "",
    formdata: {
      startDate: {
        value: "",
        element: "input",
        config: {
          name: "starting_date",
          type: "date",
          label: "начало аренды"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: true
      },
      endDate: {
        value: "",
        element: "input",
        config: {
          name: "starting_date",
          type: "date",
          label: "конец аренды"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: true
      },
      carList: {
        value: "",
        element: "select",
        config: {
          name: "select_car",
          type: "select",
          label: "выберите авто",
          cars: []
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: true
      }
    }
  };

  componentDidMount() {
    axios.get(`https://api.rent-auto.biz.tm/models`).then(res => {
      const formdata = { ...this.state.formdata };
      const cars = formdata.carList;
      cars.config.cars = res.data;
      formdata.carList = cars;
      this.setState({ formdata: formdata });
    });
  }

  formUpdate = element => {
    const formdata = { ...this.state.formdata };
    const newElement = { ...formdata[element.id] };
    newElement.value = element.event.target.value;
    newElement.valid = validate(newElement);

    formdata[element.id] = newElement;

    this.setState({
      formdata: formdata
    });
  };

  submitHander = event => {
    event.preventDefault();

    let dataToSubmit = {};
    let dataIsValid = true;

    for (let key in this.state.formdata) {
      dataToSubmit[key] = this.state.formdata[key].value;
      dataIsValid = this.state.formdata[key].valid && dataIsValid;
    }
    this.setState({ formSubmit: true });
    if (dataIsValid) {
      console.log(dataToSubmit);
    } else {
      console.log("select all the fields");
    }
  };

  render() {
    return (
      <AdminLayout>
        <div className="car_edit_container">
          <h2>{this.state.formType}</h2>
          <form
            onSubmit={event => this.submitHander(event)}
            className="car_edit_form"
          >
            <FormField
              className="edit_car_formField"
              id="startDate"
              formdata={this.state.formdata.startDate}
              change={element => this.formUpdate(element)}
              
            />
            <FormField
              className="edit_car_formField"
              id="endDate"
              formdata={this.state.formdata.endDate}
              change={element => this.formUpdate(element)}
              
            />
            <FormField
              className="edit_car_formField"
              id="carList"
              formdata={this.state.formdata.carList}
              change={element => this.formUpdate(element)}
            />

            <div className="label_success">{this.state.formSuccess}</div>
            {this.state.formError ? (
              <div className="label_error">
                что то пошло не так, повторите попытку
              </div>
            ) : (
              ""
            )}
            <button onClick={event => this.submitHander(event)}>
              {this.state.formType}
            </button>
          </form>
        </div>
      </AdminLayout>
    );
  }
}

export default CarInfo;
