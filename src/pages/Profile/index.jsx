import './style.css';
import Header from '../commom/Header'
import Footer from '../commom/Footer'
import { connect } from 'react-redux';
import { Form, Button, Input, Col, Row } from 'antd'
import { UserOutlined, HeartOutlined, SolutionOutlined, LogoutOutlined, EditOutlined } from '@ant-design/icons'
import { editUserAction } from '../../redux/actions'
import { useState } from 'react';


function Profile({ editUser }) {

  const [isDis, setIsDis] = useState(true)
  const [isHidden, setIsHidden] = useState(true)
  var localUserInfo = JSON.parse(localStorage.getItem("userInfo"));

  function handleEditUser(values) {
    console.log("🚀 ~ file: index.jsx ~ line 37 ~ handleEditUser ~ values", values)
    editUser(values)
  }

  return (
    <>
      <Header />
      <div className='profile-container'>
        <div className='profile'>
          <Row style={{ height: '100%' }} gutter={24}>
            <Col span={6}>
              <div className='menu-pro'>
                <div className='title'>
                  Thông tin cá nhân
              </div>
                <div className='align-item'>
                  <Button size='large' icon={<UserOutlined />}>Thông tin</Button>
                  <Button size='large' icon={<HeartOutlined />}>Yêu thích</Button>
                  <Button size='large' icon={<SolutionOutlined />}>Lịch sử</Button>
                </div>
                <div className='log-out'>
                  <Button danger size='large' icon={<LogoutOutlined />}>Đăng suất</Button>
                </div>
              </div>
            </Col>
            <Col className='col18' span={18}>
              <div className='img-profile'>
                <img src="https://via.placeholder.com/200x200" alt="img-profile" />
                <div className='btn-edit'>
                  <Button shape='circle' size='middle' icon={<EditOutlined />}
                    onClick={() => (setIsDis(!isDis), setIsHidden(!isHidden))}
                  >
                  </Button>
                </div>
              </div>
              <div className='form-container'>
                <Form
                  layout='vertical'
                  initialValues={{
                    id: localUserInfo.id,
                    userName: localUserInfo.userName,
                    email: localUserInfo.email,
                    location: localUserInfo.location,
                    number: localUserInfo.number,
                    newPass: localUserInfo.password,
                    confirm: localUserInfo.password
                  }}
                  onFinish={(values) => (setIsDis(true), handleEditUser(values), setIsHidden(true))}
                >
                  <div className='form-pro'>
                    <Form.Item name='id' hidden>
                      <Input disabled />
                    </Form.Item>
                    <div className='info'>
                      <Form.Item label='Tên' name='userName'>
                        <Input disabled={isDis} />
                      </Form.Item>
                      <Form.Item label='Email' name='email'>
                        <Input disabled={isDis} />
                      </Form.Item>
                      <Form.Item label='Mật khẩu mới' name='newPass'
                        rules={[
                          {
                            required: true,
                            message: 'Hãy nhập mật khẩu mới',
                          }]}
                      >
                          <Input.Password hidden={isHidden} />
                      </Form.Item>
                    </div>
                    <div className='info'>
                      <Form.Item label='Số điện thoại' name='number'>
                        <Input disabled={isDis} />
                      </Form.Item>
                      <Form.Item label='Địa chỉ' name='location'>
                        <Input disabled={isDis} />
                      </Form.Item>
                      <Form.Item
                        name="confirm"
                        label="Xác nhận mật khẩu mới"
                        dependencies={['newPass']}
                        hasFeedback
                        rules={[
                          {
                            required: true,
                            message: 'Hãy nhập xác nhận mật khẩu mật khẩu mới',
                          },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (!value || getFieldValue('newPass') === value) {
                                return Promise.resolve();
                              }
                              return Promise.reject(new Error('Mật khẩu xác nhận sai'));
                            },
                          }),
                        ]}
                      >
                        <Input.Password hidden={isHidden} />
                      </Form.Item>
                    </div>
                  </div>
                  <div className='btn-save'>
                    {isDis ? null : <Button htmlType='submit' size='large' >Lưu thay đổi</Button>}
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <Footer />
    </>
  )
}


const mapStateToProps = (state) => {
  const { userInfo } = state.userReducer
  return {
    userInfo,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    editUser: (params) => dispatch(editUserAction(params)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
