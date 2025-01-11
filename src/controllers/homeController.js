

const homeController = (req, res) => {
    res.render('home',{
        titulo: 'Fundacion | caremondae',
        estilos: 'home'
    })
}

export {
    homeController
}