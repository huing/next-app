import React from 'react';

interface PropsDTO {
	[propsName: string]: any;
}

const Page: React.FC<PropsDTO> = () => {
	return <div>content</div>;
};
export default Page;
