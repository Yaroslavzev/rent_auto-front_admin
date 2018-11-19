import React, { Component } from "react";
import AdminLayout from "../../../hoc/adminLayout";
import FormField from "../../../UI/formField";
import { validate } from "../../../UI/misc";
import "./carInfo.css";
import axios from 'axios';

class CarInfo extends Component {
  state = {
    formType: "Edit",
    carId: "",
    cars: [], 
    formError: false,
    formSuccess: "",
    formdata: {
      startDate: {
        value: "",
        element: "input",
        config: {
          name: "starting_date",
          type: "date", 
          label: 'начало аренды'
        },
        validation: {
          required: true,
        },
        valid: true,
        validationMessage: "",
        showLabel: true
      }, 
      endDate: {
        value: "",
        element: "input",
        config: {
          name: "starting_date",
          type: "date", 
          label: 'конец аренды'
        },
        validation: {
          required: true,
        },
        valid: true,
        validationMessage: "",
        showLabel: true
      },
      carList: {
        value: "",
        element: "select",
        config: {
          name: "select_car",
          type: "select", 
          label: 'выберите авто'
        },
        validation: {
          required: true,
        },
        valid: true,
        validationMessage: "",
        showLabel: true
      }
    }
  };

  componentDidMount(){
    axios.get(`https://api.rent-auto.biz.tm/models`).then(res=>{
      const list = res.data;
      this.setState({cars: list})
    })
  }

  formUpdate = element => {
    const formdata = { ...this.state.formdata };
    const newElement = { ...formdata[element.id] };
    newElement.value = element.event.target.value;
    formdata[element.id] = newElement;
    this.setState({
      formdata: formdata
    });
  };

  render() {
   
    return (
      <AdminLayout>
        <div className="car_edit_container">
          <h2>{this.state.formType}</h2>
          <form onSubmit={() => this.submitHander()} className="car_edit_form">
            <FormField className="edit_car_formField"
              id="startDate"
              formdata={this.state.formdata.startDate}
              change={element => this.formUpdate(element)}
            />
              <FormField className="edit_car_formField"
              id="endDate"
              formdata={this.state.formdata.endDate}
              change={element => this.formUpdate(element)}
            />
            <FormField className="edit_car_formField"
              id="carList"
              formdata={this.state.formdata.carList}
              change={element => this.formUpdate(element)}
              options={this.state.cars}
            />
          </form>
        </div>
      </AdminLayout>
    );
  }
}

export default CarInfo;
