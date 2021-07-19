function Footer() {
    const styles = {
        width: '100%',
        padding: "15px 0",
        textAlign: 'center',
        backgroundColor: "#c2a22f",
        color: 'white',
        fontSize: "1.125rem",
        fontFamily: "cursive"
    }
    return (
        <div style={styles}>
            <span>&copy; All rights reserved</span>
        </div>
    )
}

export {Footer}