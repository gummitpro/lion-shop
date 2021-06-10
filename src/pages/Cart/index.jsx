import { Row, Col } from 'antd';
import Header from "../commom/Header";
import Footer from "../commom/Footer";
import "./style.css";
function index() {
  var localStorageCart = JSON.parse(localStorage.getItem("shoppingCart"));
  console.log("localStorageCart", localStorageCart.length)
  const renderListCart =  localStorageCart.map((item) => {
    return (
      <div className="cart-product">
        <div className="cart-image"  height="80" width="80">
          <img className="lazyload" alt="product" src={item.image} loading="lazy" decoding="async"/>
        </div>
        <div className="cart-name" style={{width: "300px"}}>
          <p>{item.name}</p>
        </div>
        <div className="cart-quanty">
          
          <button className="btn-quantity">
            {/* <span >{item.quantity === 1 ? (<i className="fal fa-trash-alt"></i>) : "-"}</span> */}
            <span>-</span>
          </button>
          <input type="number" className="content-quantity" value={item.quantity} readOnly style={{marginLeft: "10px"}} />
          <button className="btn-quantity">
            <span>+</span>
          </button>
          
        </div>
        <div className="cart-price">
          <p>{item.price.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
        </div>
      </div>
    )
  })
  return (
    <>
      <Header />
      <div className="wrap-cart">
        <Row justify='center' className="content-cart" gutter={[16, 16]}>
          <Col span={16}>
            <h2>Giỏ hàng của bạn</h2>
            <div className="list-cart-product">
              
              {renderListCart}

            </div>
          </Col>
          <Col span={8}>
            <h2>Thanh toán</h2>
            <div className="content-payment">
             
              <div className="info-payment">
                <div>
                  <p>Tạm tính</p>
                  <p>123100000</p>
                </div>
                <div>
                  <p>Phí vận chuyển</p>
                  <p>123200000</p>
                </div>
                <div>
                  <p>Khuyến mãi</p>
                  <p>123200000</p>
                </div>
                <div>
                  <p>Thành tiền</p>
                  <p className="sumary-money">123200000</p>
                </div>
                <button className="btn-payment">
                  Thanh toán ngay
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <Footer />
    </>
  )
}

export default index;