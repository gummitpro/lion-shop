import React from 'react'
import { Card} from 'antd';
import { Link } from 'react-router-dom';
const { Meta } = Card;

function index(props) {
	const {id, name, price, image} = props;
	return (
		<>
			<Link to={`/product/${id}`}>
				<Card
				hoverable
				style={{ width: 240 }}
				cover={<img alt={name} src={image} />}
			>
				<Meta title={name} description={price && price.toLocaleString('vi', { style: 'currency', currency: 'VND' })}  />
			</Card>,
			</Link>

		</>
	)
}

export default index
