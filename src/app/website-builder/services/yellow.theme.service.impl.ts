import { Injectable } from '@angular/core';
import { WebsiteThemeService } from './website.theme.service.';
import { AssociationModel } from 'app/models/association-model';

@Injectable({
  providedIn: 'root'
})
export class YellowThemeServiceImpl implements WebsiteThemeService {
  
  constructor(private assoicjation: AssociationModel) {

  }

  
  getStyles(): string[] {
    return [
      'http://localhost/actta/assets/vendor/bootstrap/css/bootstrap.min.css',
      'http://localhost/actta/assets/vendor/bootstrap-icons/bootstrap-icons.css',
      'http://localhost/actta/assets/vendor/aos/aos.css',
      'http://localhost/actta/assets/vendor/glightbox/css/glightbox.min.css',
      'http://localhost/actta/assets/vendor/swiper/swiper-bundle.min.css',
      'http://localhost/actta/assets/css/main.css',
      'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600;1,700&family=Amatic+SC:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Inter:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap'
    ];
  }
  getScripts(): string[] {
    return [
      'http://localhost/actta/assets/vendor/bootstrap/js/bootstrap.bundle.min.js',
      'http://localhost/actta/assets/vendor/aos/aos.js',
      'http://localhost/actta/assets/vendor/glightbox/js/glightbox.min.js',
      'http://localhost/actta/assets/vendor/purecounter/purecounter_vanilla.js',
      'http://localhost/actta/assets/vendor/swiper/swiper-bundle.min.js',
      'http://localhost/actta/assets/vendor/php-email-form/validate.js',
      'http://localhost/actta/assets/js/main.js'
    ];
  }
  
  addPrebuitBlocks(editor: any): void {
    this.addNavbarBlock(editor);
    this.addHomePageBlock(editor);
    this.addAboutUsBlock(editor);
    this.addMembershipBlock(editor);
    this.addEventsBlock(editor);
    this.addCommitteeBlock(editor);
    this.addDonorsBlock(editor);
    this.addContactUsBlock(editor);
    this.addFooterBlock(editor);
  }

  addNavbarBlock(editor: any): void {
    const navbarHtmlContent =
      ` <header id="header" class="header fixed-top d-flex align-items-center">
        <div class="container d-flex align-items-center justify-content-between">

        <a href="index.html" class="logo d-flex align-items-center me-auto me-lg-0">
          <h1>ACTTA<span>.</span></h1>
        </a>

        <nav id="navbar" class="navbar">
          <ul>
            <li><a href="https://wwww.google.com">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#membership">Membership</a></li>
            <li><a href="#committee">Committee</a></li>
            <li><a href="#events">Events</a></li>
            <li><a href="#gallery">Gallery</a></li>
            <li><a href="#sponsors">Sponsors</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>

      <i class="mobile-nav-toggle mobile-nav-show bi bi-list"></i>
      <i class="mobile-nav-toggle mobile-nav-hide d-none bi bi-x"></i>

     </div>
  </header>`;

    const bm = editor.Blocks;
    bm.add('link-block', {
      label: 'Yummy Theme',
      category:'Prebuild Sections',
      anchor: {
        editable: true,
      },
      media: `<svg width="60" height="40"><g><text transform="matrix(0.602357 0 0 0.878453 -0.161207 3.59642)"  font-family="'Changa'" font-size="24" id="svg_1" y="25.81081" x="0.40541"  fill="currentcolor">
        NAVBAR
      </text></g></svg>`,
      content: navbarHtmlContent,
    });


  }
  addHomePageBlock(editor: any): void {
    const homePageBlockContent =
      `<section id="acttaHome" class="hero d-flex align-items-center section-bg">
        <div class="container">
          <div class="row justify-content-between gy-5">
            <div class="col-lg-5 order-2 order-lg-1 d-flex flex-column justify-content-center align-items-center align-items-lg-start text-center text-lg-start">
              <h2 data-aos="fade-up">Welcome to ACTTA</h2>
              <p data-aos="fade-up" data-aos-delay="100">ACTTA is a non-profit organization consisting of individuals with Indian heritage from the Telangana State in South India who share common values and beliefs. It is an immense source of pride that the distinct cultural identity of the Telangana region played a pivotal role in the creation of the Telangana State by the Indian government.</p>
          <p data-aos="fade-up" data-aos-delay="200">With the aim of providing a voice to the Telangana community residing in Canberra, the executive committee of ACTTA is thrilled to introduce the registered ACT Telangana Association. This association will serve as a platform for Canberreans of Telangana origin to connect with one another and advocate for their interests and concerns..</p>
            
            </div>
            <div class="col-lg-5 order-1 order-lg-2 text-center text-lg-start">
              <img src="http://localhost/actta/assets/img/hero-img.png" class="img-fluid " alt="" data-aos="zoom-out" data-aos-delay="300">
            </div>
          </div>
        </div>
    </section>`;

    const bm = editor.Blocks;

    bm.add('Home section', {
      label: 'Home section',
      category:'Prebuild Sections',
      media: `<svg width="60" height="40"><g><text transform="matrix(0.602357 0 0 0.878453 -0.161207 3.59642)"  font-family="'Changa'" font-size="24" id="svg_1" y="25.81081" x="0.40541"  fill="currentcolor">
      About us
    </text></g></svg>`,
      content: homePageBlockContent,
    });
  }

  addAboutUsBlock(editor: any): void {
    throw new Error('Method not implemented.');
  }
  addMembershipBlock(editor: any): void {
    throw new Error('Method not implemented.');
  }
  addEventsBlock(editor: any): void {
    throw new Error('Method not implemented.');
  }
  addCommitteeBlock(editor: any): void {
    throw new Error('Method not implemented.');
  }
  addSponsorsBlock(editor: any): void {
    throw new Error('Method not implemented.');
  }
  addDonorsBlock(editor: any): void {
    throw new Error('Method not implemented.');
  }
  addContactUsBlock(editor: any): void {
    throw new Error('Method not implemented.');
  }
  addFooterBlock(editor: any): void {
    throw new Error('Method not implemented.');
  }

  getHtmlContent():string{
    return ` <header id="header" class="header fixed-top d-flex align-items-center">
    <div class="container d-flex align-items-center justify-content-between">
 
    <a href="index.html" class="logo d-flex align-items-center me-auto me-lg-0">
      <h1>ACTTA<span>.</span></h1>
    </a>
 
    <nav id="navbar" class="navbar">
      <ul>
        <li><a href="https://wwww.google.com">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#membership">Membership</a></li>
        <li><a href="#committee">Committee</a></li>
        <li><a href="#events">Events</a></li>
        <li><a href="#gallery">Gallery</a></li>
        <li><a href="#sponsors">Sponsors</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
 
  <i class="mobile-nav-toggle mobile-nav-show bi bi-list"></i>
  <i class="mobile-nav-toggle mobile-nav-hide d-none bi bi-x"></i>
 
 </div>
 </header>`;
   }

   canLoadJavaScripts(): boolean {
    return true;
  }
}
