import React from 'react'
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Input, Popover, Button } from 'antd';
import { logoutAction } from '../../../redux/actions'
import history from '../../../utils/history'
import '../Header/style.css'
const { Search } = Input;

const onSearch = value => console.log(value);
function Header({ userInfo, logout }) {
	var localStorageCart = JSON.parse(localStorage.getItem("shoppingCart"));
	var renderListCart = []
	if (localStorageCart !== null) {
		renderListCart = localStorageCart.map((item) => {
			return (
				<div className="sub-cart">
					<div className="img-sub">
						<img src={item.image} alt="pic" />
					</div>
					<div className="description-sub">
						<div>{item.name}</div>
						<div>{item.price.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</div>
					</div>
				</div>
			)
		})
	}
	const contentUser = (
		<div className="sub-user">
			{userInfo.data.admin ? null 
			:<Button onClick={() => history.replace({ pathname: '/ca-nhan' })}>Thông tin cá nhân</Button>}
			<Button onClick={() => logOut()}>
				<div>Đăng suất</div>
			</Button>
		</div>
	)
	function logOut() {
		history.replace({ pathname: '/' })
		localStorage.clear()
		logout()
	}

	return (
		<>
			<header>
				<div className="container-header">
					<Link to="/">
						<div className="brand">
							<div className="brand-img">
								<img src="https://cdn.thukyluat.vn/nhch-images//CauHoi_Hinh/9eb6abaa-8cda-456c-ad66-26ba4da23ffe.jpg?fbclid=IwAR0t7ycFiSjYHuDoezWnRRuzVWsLYvRYPvxXjGfgVoXxfCzuoeECKgR-EWM" alt="logo" />
							</div>
							<div className="brand-name">
								<h1>LION</h1>
							</div>
						</div>
					</Link>
					<div className=" header-search">

						<Search
							placeholder="Tìm kiếm sản phẩm"
							allowClear
							enterButton
							size="large"

							onSearch={onSearch}
						/>
					</div>
					<ul className="header-menu">
						<li title="Giỏ hàng" className="cart-wrapp" >
							<Popover className="btn-hover-cart" placement="bottomRight" content={renderListCart} trigger="hover">
								<Button>
									<Link to="/gio-hang">
										<div className="center-icon">
											<span><i className="far fa-shopping-cart"></i></span>
										</div>
										<div className="scroll ">
											<span >Giỏ hàng</span>
										</div>
									</Link>
								</Button>
							</Popover>
						</li>
						{userInfo.data.id ?
							(
								<li title="Cá nhân" className="login-hover">
									<Popover placement="bottom" content={contentUser} trigger="hover">
										<Button>
											{userInfo.data.admin ?
												<Link to="/admin"><div className="center-icon">
													<span><i className="far fa-user"></i></span>
												</div>
													<div className="scroll ">
														<span >{userInfo.data.userName}</span>
													</div>
												</Link>
												: <Link to="/ca-nhan">
														<div className="center-icon">
															<span><i className="far fa-user"></i></span>
														</div>
														<div className="scroll ">
															<span >{userInfo.data.userName}</span>
														</div>
													</Link>
										}
										</Button>
									</Popover>
								</li>
							) : (
								<>
									<li title="Đăng nhập">
										<Button>
											<Link to="/dang-nhap">
												<div className="center-icon">
													<span><i className="far fa-sign-in-alt"></i></span>
												</div>
												<div className="scroll ">
													<span >Đăng nhập</span>
												</div>
											</Link>
										</Button>
									</li>
									<li title="Đăng ký">
										<Button>
											<Link to="/dang-ky">
												<div className="center-icon">
													<span><i className="far fa-book"></i></span>
												</div>
												<div className="scroll ">
													<span >Đăng ký</span>
												</div>
											</Link>
										</Button>
									</li>
								</>
							)
						}
					</ul>

				</div>
			</header>

		</>
	)
}
const mapStateToProps = (state) => {
	const { userInfo } = state.userReducer;
	return {
		userInfo,
	}
};
const mapDispatchToProps = (dispatch) => {
	return {
		logout: (params) => dispatch(logoutAction(params))
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)

