import React from 'react'
import Link from 'next/link'

const DropdownLink = (props) => {
    const { href, children, ...rest } = props;

    return (
        <Link href={href} {...rest}>{children}</Link>
    )
}

export default DropdownLink