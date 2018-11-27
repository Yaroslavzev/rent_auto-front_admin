import React, { Component } from "react";
import AdminLayout from "../../../hoc/adminLayout";
import FormField from "../../../UI/formField";
import { validate } from "../../../UI/misc";
import "./carInfo.css";
import axios from "axios";
import { data } from "./data";
import {connect} from 'react-redux'; 
import {headers} from '../../../UI/misc';

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
          name: "select_options",
          type: "select",
          label: "выберите опцию для авто"
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
          name: "select_specs",
          type: "select",
          label: "выберите spec"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: true
      },
      carName: {
        value: "",
        element: "input",
        config: {
          name: "car_name",
          type: "text",
          label: "Название автомобиля"
        },
        validation: {
          required: true
        },
        valid: true,
        validationMessage: "",
        showLabel: true
      }
    }
  };

  componentDidMount() {      
    axios.get(`https://api.rent-auto.biz.tm/models`, headers).then(res => {
      const id = this.props.match.params.id;
      let car;
      for (let key in res.data) {
        if (res.data[key].id == id) {
          car = res.data[key];
        }
      }

      this.setState({ car: car, carId: id });
      this.updateFields(car);
    });
  }

  updateFields = car => {
    const formdata = { ...this.state.formdata };
    for (let key in formdata) {
      if (key == "carName") {
        formdata[key].value = car.full_name;
      }
    }
    this.setState({ formdata: formdata });
  };

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
            {data.map((item, i) => (
              <FormField
                key={i}
                className="edit_car_formField"
                id={item.id}
                formdata={this.state.formdata[item.id]}
                change={element => this.formUpdate(element)}
                submit={this.state.formSubmit}
                options={this.state.car[item.options]}
              />
            ))}

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

const mapStateToProps = state => {
  return {
    email: state.email, 
    token: state.token
  }
}

export default connect(mapStateToProps)(CarInfo);
