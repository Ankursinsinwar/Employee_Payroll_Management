document.getElementById("paji").addEventListener("click", function () {
    const header = document.getElementById("header");
    const header_t = document.getElementById("header").innerText;
    const footer = document.getElementById("footer");
    const footer_t = document.getElementById("footer").innerText;
    const left = document.getElementById("left");
    const lu = document.getElementById("lu");
    const lu_t = document.getElementById("lu").innerText;
    const ld = document.getElementById("ld");
    const ld_t = document.getElementById("ld").innerText;
    const right = document.getElementById("right");
    const ru = document.getElementById("ru");
    const ru_t = document.getElementById("ru").innerText;
    const rd = document.getElementById("rd");
    const rd_t = document.getElementById("rd").innerText;
    const bbl = document.getElementById("bbl");
    const bbr = document.getElementById("bbr");

    const header_h = window.getComputedStyle(header).height;
    // console.log(header_h);
    const header_b = window.getComputedStyle(header).backgroundColor;
    const header_f = window.getComputedStyle(header).fontSize;


    const footer_h = window.getComputedStyle(footer).height;
    const footer_b = window.getComputedStyle(footer).backgroundColor;
    const footer_f = window.getComputedStyle(footer).fontSize;

    const left_w = window.getComputedStyle(left).width;
    const lu_h = window.getComputedStyle(lu).height;
    const lu_b = window.getComputedStyle(lu).backgroundColor;

    const ld_h = window.getComputedStyle(ld).height;
    const ld_b = window.getComputedStyle(ld).backgroundColor;

    const right_w = window.getComputedStyle(right).width;
    const ru_h = window.getComputedStyle(ru).height;
    const ru_b = window.getComputedStyle(ru).backgroundColor;

    const rd_h = window.getComputedStyle(rd).height;
    const rd_b = window.getComputedStyle(rd).backgroundColor;

    const bbl_w = window.getComputedStyle(bbl).width;

    const bbr_w = window.getComputedStyle(bbr).width;



    header.innerText = footer_t;
    header.style.height = footer_h;
    header.style.backgroundColor = footer_b;
    // header.style.fontSize = footer_f;


    footer.innerText = header_t;
    footer.style.height = header_h;
    footer.style.backgroundColor = header_b;
    // footer.style.fontSize = header_f;

    lu.innerText = ld_t;
    lu.style.height = ld_h;
    lu.style.backgroundColor = ld_b;

    ld.innerText = lu_t;
    ld.style.height = lu_h;
    ld.style.backgroundColor = lu_b;


    ru.innerText = rd_t;
    ru.style.height = rd_h;
    ru.style.backgroundColor = rd_b;

    rd.innerText = ru_t;
    rd.style.height = ru_h;
    rd.style.backgroundColor = ru_b;


    bbl.style.width = bbr_w;
    bbr.style.width = bbl_w;



});

    // setInterval(() => {
    //     document.getElementById("paji").click();
    //   }, 100);
    
