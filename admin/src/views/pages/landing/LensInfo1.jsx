import React, { Component } from "react";

import {
  CLabel,
  CForm,
  CInput,
  CInputFile,
  CTextarea,
  CFormText,
  CFormGroup,
  CButton,
  CCol,
  CRow,
  CAlert,
  CCollapse,
  CCard,
  CCardBody,
  CInputGroupText,
  CInputGroup,
} from "@coreui/react";

import UploadImg from "../../UploadImg/UploadImg";

import axios from "axios";
import FlashMessage from 'react-flash-message'

var SERVER_URI = "http://localhost:5000";
var ADMIN_URI = "http://localhost:3000";

if (process.env.NODE_ENV === "development") {
  SERVER_URI = "http://localhost:5000";
  ADMIN_URI = "http://localhost:3000";
}

if (process.env.NODE_ENV === "production") {
  SERVER_URI = "https://horizon-server.herokuapp.com";
  ADMIN_URI = "https://horizon-admin.herokuapp.com";
}

// for functional component

// const [image, setImage] = useState(null);
// const [url, setUrl] = useState("");
// const [progress, setProgress] = useState(0);

class LensInfo1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      activeKey: 0,
      edited: false,
      submitClass: 'disabled',
      submitDisable: true,

      image: "...",
      url: "...",
      progress: "...",

      li1_header: "...",
      li1_desc: "...",
      li1_img: "...",
      li1_parag_1: "...",
      li1_parag_2: "...",
      li1_parag_3: "...",
      li1_parag_4: "..."
    };

    this.onChange_li1_parag_1 = this.onChange_li1_parag_1.bind(this);
    this.onChange_li1_parag_2 = this.onChange_li1_parag_2.bind(this);
    this.onChange_li1_parag_3 = this.onChange_li1_parag_3.bind(this);
    this.onChange_li1_parag_4 = this.onChange_li1_parag_4.bind(this);

    this.onChange = this.onChange.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
  }


  componentDidMount() {
    axios
      .get(`${SERVER_URI}/api/getLensInfo1`)
      .then((response) => {
        // console.log(response.data);
        const {
          li1_header,
          li1_desc,
          li1_img,
          li1_parag_1,
          li1_parag_2,
          li1_parag_3,
          li1_parag_4,
        } = response.data;
        this.setState({
          li1_header: li1_header,
          li1_desc: li1_desc,
          li1_img: li1_img,
          li1_parag_1: li1_parag_1,
          li1_parag_2: li1_parag_2,
          li1_parag_3: li1_parag_3,
          li1_parag_4: li1_parag_4,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChange(e) {
    const value = e.target.value;
    this.setState({
      [e.target.name]: value,
      submitClass: 'primary',
      submitDisable: false,
      edited: false,
    })
  }

  onChange_li1_parag_1(e) {
    this.setState({
      li1_parag_1: e.target.value,
      submitClass: 'primary',
      submitDisable: false,
      edited: false,
    });
  }
  onChange_li1_parag_2(e) {
    this.setState({
      li1_parag_2: e.target.value,
      submitClass: 'primary',
      submitDisable: false,
      edited: false,
    });
  }

  onChange_li1_parag_3(e) {
    this.setState({
      li1_parag_3: e.target.value,
      submitClass: 'primary',
      submitDisable: false,
      edited: false,
    });
  }

  onChange_li1_parag_4(e) {
    this.setState({
      li1_parag_4: e.target.value,
      submitClass: 'primary',
      submitDisable: false,
      edited: false,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const prog_section = {
      li1_header: this.state.li1_header,
      li1_desc: this.state.li1_desc,
      li1_img: this.state.li1_img,
      li1_parag_1: this.state.li1_parag_1,
      li1_parag_2: this.state.li1_parag_2,
      li1_parag_3: this.state.li1_parag_3,
      li1_parag_4: this.state.li1_parag_4
    };

    axios.post(`${SERVER_URI}/api/postLensInfo1`, prog_section)
      .then(res => console.log(res));

    // window.location = `${ADMIN_URI}/#/landing/LensInfo1/`;
    this.setState({ edited: true, submitClass: 'disabled', submitDisable: true, })
  }

  // Using imgbb for image hosting 
  // onSubmitImgFile(e) {
  //   e.preventDefault();

  //   axios
  //     .post(`https://api.imgbb.com/1/upload?expiration=600&key=5654e1ea6c180344bb90d5fad457ef02`)
  //     .then((res) => console.log(res));

  //   window.location = `${ADMIN_URI}/#/landing/LensInfo1/`;
  // }

  render() {
    return (
      <CRow>
        {
          (this.state.edited == true) ?
            <div>
              <FlashMessage duration={3000}>
                <CAlert
                  width="1"
                  color="success"
                  dismissible={true}
                >
                  <strong>Uploaded</strong> Successfully...
              </CAlert>
              </FlashMessage>
            </div>
            :
            <p></p>
        }
        <CCol xs="12">
          <CForm onSubmit={this.onSubmit}>
            <CFormGroup>
              {/* #1 name */}
              <h6>{this.state.li1_header}</h6>
              <CInput
                type="text"
                id="li1_header"
                name="li1_header"
                placeholder="li1_header"
                value={this.state.li1_header}
                onChange={this.onChange}
              />
              <br />
              <CInput
                type="text"
                id="li1_desc"
                name="li1_desc"
                placeholder="li1_desc"
                value={this.state.li1_desc}
                onChange={this.onChange}
              />
              <br />
              <CInputGroup className="mb-3">
                <CInputGroupText id="basic-addon3">
                  Paste Image URL
              </CInputGroupText>
                <CInput
                  type="text"
                  id="li1_img"
                  name="li1_img"
                  placeholder="li1_img"
                  value={this.state.li1_img}
                  onChange={this.onChange}
                />
              </CInputGroup>
              <br />
              <CInput
                type="text"
                id="li1_parag_1"
                name="li1_parag_1"
                placeholder="li1_parag_1"
                value={this.state.li1_parag_1}
                onChange={this.onChange}
              />
              <br />
              <CInput
                type="text"
                id="li1_parag_2"
                name="li1_parag_2"
                placeholder="li1_parag_2"
                value={this.state.li1_parag_2}
                onChange={this.onChange}
              />
              <br />
              <CInput
                type="text"
                id="li1_parag_3"
                name="li1_parag_3"
                placeholder="li1_parag_3"
                value={this.state.li1_parag_3}
                onChange={this.onChange}
              />
              <br />
              <CInput
                type="text"
                id="li1_parag_3"
                name="li1_parag_3"
                placeholder="li1_parag_3"
                value={this.state.li1_parag_3}
                onChange={this.onChange}
              />
            </CFormGroup>

            <hr />
            <br />

            <CFormGroup>
              <CInput
                type="submit"
                id="submit"
                name="submit"
                placeholder="submit"
                className={`bg-${this.state.submitClass} text-white bold`}
                value="SUBMIT"
                disabled={this.state.submitDisable}
              />
            </CFormGroup>
          </CForm>
        </CCol>

        <UploadImg />
      </CRow>
    );
  }
}

export default LensInfo1;
