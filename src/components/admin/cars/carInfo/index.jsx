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
    car: [],
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
      carOptions: {
        value: "",
        element: "select",
        config: {
          name: "select_car",
          type: "select",
          label: "выберите опцию для авто",
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: true
      }, 
      carSpecs: {
        value: "",
        element: "select",
        config: {
          name: "select_car",
          type: "select",
          label: "выберите spec",
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
      const id= this.props.match.params.id
      let car;
      for(let key in res.data){
        if(res.data[key].id == id){
          car = res.data[key]
        }
      }
      this.setState({ car: car, carId: id });
    });
  }

  formUpdate = element => {
    const formdata = { ...this.state.formdata };
    const newElement = { ...formdata[element.id] };
    newElement.value = element.event.target.value;
    const validData = validate(newElement);
    newElement.valid = validData[0];
    newElement.validationMessage[1];
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
              submit={this.state.formSubmit}
            />
            <FormField
              className="edit_car_formField"
              id="endDate"
              formdata={this.state.formdata.endDate}
              change={element => this.formUpdate(element)}
              submit={this.state.formSubmit}
            />
            <FormField
              className="edit_car_formField"
              id="carOptions"
              formdata={this.state.formdata.carOptions}
              change={element => this.formUpdate(element)}
              submit={this.state.formSubmit}
              options = {this.state.car.options}
            />
            <FormField
              className="edit_car_formField"
              id="carSpecs"
              formdata={this.state.formdata.carSpecs}
              change={element => this.formUpdate(element)}
              submit={this.state.formSubmit}
              options = {this.state.car.specs}
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
