'use client';

const MainBackground = ({children}) => {
    return (
        <div className="h-screen w-screen bg-blue-radial">
            {children}
        </div>
    );
}

export default MainBackground;