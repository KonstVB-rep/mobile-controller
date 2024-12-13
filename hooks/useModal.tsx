import React from 'react';

const useModal = () => {
	const [showModal, setShowModal] = React.useState(false);

	return { showModal, setShowModal };
};

export default useModal;
