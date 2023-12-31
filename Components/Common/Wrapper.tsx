import React from 'react';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<section className="w-full sm:w-[425px] h-screen overflow-hidden flex flex-col mx-auto bg-white">
			{children}
		</section>
	);
};

export default Wrapper;
