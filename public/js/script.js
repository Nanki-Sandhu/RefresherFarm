const nav=document.querySelector(".nav");
const hamburger=document.querySelector(".hamburger");
const header=document.querySelector(".header");
const links=document.querySelector(".nav_link");

/*Flash Message Cross out */
const flashBox=document.querySelector(".flashOutter");
const flashCross=document.querySelector(".icon");

/*FlashBox Cross out working */

    flashCross.onclick=()=>{
        flashBox.style.display="none";
 }

/*Hamburger Functioning */
hamburger.addEventListener('click',()=>{
    nav.classList.toggle("nav_open");
    hamburger.classList.toggle("hamburger_open");
});


window.addEventListener('scroll',()=>{
        if(scrollY>50){
            header.classList.add('nav_scroll');
            links.classList.add('hover');
        }else if(scrollY<=50){
            header.classList.remove('nav_scroll');
            links.classList.remove('hover');
        }
});






