import React from "react";

export function Header(props) {
    const { children, isOpen, setIsOpen } = props;

    return (
        <div className="fixed top-0 w-screen h-14 border-b border-zinc-800 bg-yellow-600">
        </div>
    );
}
