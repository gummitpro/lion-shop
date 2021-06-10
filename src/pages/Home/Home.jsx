import React from 'react'
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Carousel  } from 'antd';

import { BrowserRouter as  Link } from "react-router-dom";
import './style.css'
import Header from '../commom/Header';
import Footer from '../commom/Footer';
import Item from '../commom/Item'

import { getProductListAction } from '../../redux/actions';

function Home({getProductList, productList }) {
	useEffect(() => {
		getProductList();
	}, []);

	const contentStyle = {
		height: 'auto',
		color: '#fff',
		lineHeight: '160px',
		textAlign: 'center',
		background: '#364d79',
		
	 };
	
	function renderProduct() {
		return productList.data.map((item, id) => {
			
		  return (
			<Col md={6} key={id}>
				<Item id={item.id} name={item.name} price={item.price} image={item.image}/>
			</Col>
		  )
		})
	}

	return (
		<>
			<Header />
			<div className="wrap-home">
				<Carousel autoplay dots={false}>
					<div>
						<h3 className="carousel" style={contentStyle}>
							<img src="https://lh3.googleusercontent.com/GM_PRsMUvDzsPah9zT4mijpZ7TrxK-0Jeibc2zMzGzAAEjr2SCCRVp-lptGP5Wzx6yrb5PAdVRRrLlOTOVLBI-c0Q4BcbqmH=w1920-rw" alt="name" />
						</h3>
					</div>
					<div>
						<h3 className="carousel" style={contentStyle}>
							<img src="https://lh3.googleusercontent.com/xS-Ey_-W5I4JaPc8oL9xJZhYtvAFdF_76KMHUVbW7Xf-jfaoxj420-6WZ_RiKVd10ZN3iZr4FV6UuWllJS6d-dXAdk6mjO0=w1920-rw" alt="name" />
						</h3>
					</div>
					<div>
						<h3 className="carousel" style={contentStyle}>
							<img src="https://lh3.googleusercontent.com/V-vPPB588FJOanwJQLBjp02hp0zkGBWM9lerFDI2V84laXVRfXXq2UEZDhQToi1i-F1ocDQ0cHVtGm5-Ixo8EmZilBymf_k=w1920-rw" alt="name" />
						</h3>
					</div>
					<div>
						<h3 className="carousel" style={contentStyle}>
							<img src="https://lh3.googleusercontent.com/1KJ9inWD5ELRzE3OZ7dfgq5lkkb-favqqE9BAh3EIIENopR_xSIUxtqYOQDVdPZ0PbgQ_jOkxL8vMb_hd814L3jykdxMFAQWZQ=w1920-rw" alt="name" />
						</h3>
					</div>
				</Carousel>
				
				<div className="banner">
					<Link to="https://images.fpt.shop/unsafe/fit-in/1200x200/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2021/4/15/637541252160464389_F-H5_1200x200.png">
						<img src="https://images.fpt.shop/unsafe/fit-in/1200x200/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2021/4/15/637541252160464389_F-H5_1200x200.png" alt="name" />
					</Link>
				</div>
				
				<div className="banner-product">
					<div className="site-card-wrapper">
						<Row gutter={[16,16]}>
							{renderProduct()}
						</Row>
					</div>
				</div>

				<div className="banner">
					<a href="">
						<img src="https://hoanghamobile.com/Uploads/2021/04/16/banner-iphone-12-mini-1200-140.gif" alt="name" />
					</a>
				</div>
				
			</div>

			<Footer />
		</>
	)
}
const mapStateToProps = (state) => {
	const { productList } = state.productReducer;
	return {
	  productList: productList,
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
	  getProductList: (params) => dispatch(getProductListAction(params)),
	};
}
export default connect(mapStateToProps,mapDispatchToProps) (Home)
