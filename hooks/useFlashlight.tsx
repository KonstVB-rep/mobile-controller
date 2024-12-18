import { useState } from 'react';

const useFlashlight = () => {
	const [isOnFlashlight, setIsOnFlashlight] = useState<boolean>(false);

	return { isOnFlashlight, setIsOnFlashlight };
};

export default useFlashlight;
