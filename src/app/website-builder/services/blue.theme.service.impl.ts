import { Injectable } from '@angular/core';
import { WebsiteThemeService } from './website.theme.service.';
import { environment } from 'environments/environment';
import { AssociationModel } from 'app/models/association-model';

@Injectable({
  providedIn: 'root'
})
export class BlueThemeServiceImpl implements WebsiteThemeService {
  private blockCategory: string = 'Prebuild Sections';

  private websiteBaseUrl: string;
  private themeUrl: string;


  constructor(private assoicjation: AssociationModel) {
    this.websiteBaseUrl = environment.cdnURL + "/" + this.assoicjation.soceityRaxUrl;
    this.themeUrl = environment.cdnURL + "/bluetheme";
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

  getStyles(): string[] {

    return [
      this.themeUrl + '/assets/vendor/fontawesome-free/css/all.min.css',
      this.themeUrl + '/assets/vendor/animate.css/animate.min.css',
      this.themeUrl + '/assets/vendor/bootstrap/css/bootstrap.min.css',
      this.themeUrl + '/assets/vendor/bootstrap-icons/bootstrap-icons.css',
      this.themeUrl + '/assets/vendor/boxicons/css/boxicons.min.css',
      this.themeUrl + '/assets/vendor/glightbox/css/glightbox.min.css',
      this.themeUrl + '/assets/vendor/remixicon/remixicon.css',
      this.themeUrl + '/assets/vendor/swiper/swiper-bundle.min.css',
      this.themeUrl + '/assets/css/style.css',
      this.themeUrl + '/assets/css/sorax-custom.css',
      'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600;1,700&family=Amatic+SC:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Inter:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap'
    ];
  }
  getScripts(): string[] {
    return [
      this.themeUrl + '/assets/vendor/purecounter/purecounter_vanilla.js',
      this.themeUrl + '/assets/vendor/bootstrap/js/bootstrap.bundle.min.js',
      this.themeUrl + '/assets/vendor/glightbox/js/glightbox.min.js',
      this.themeUrl + '/assets/vendor/swiper/swiper-bundle.min.js',
      this.themeUrl + '/assets/vendor/php-email-form/validate.js',
      this.themeUrl + '/assets/js/jquery-3.6.0.min.js',
      this.websiteBaseUrl + '/assets/js/events.js',
      this.websiteBaseUrl + '/assets/js/committees.js',
      this.websiteBaseUrl + '/assets/js/donors.js',
      this.themeUrl + '/assets/js/main.js',
    ];
  }

  getMediaIcon(name: string, width: number = 60) {

    return `<svg width="${width}" height="40"><g><text transform="matrix(0.602357 0 0 0.878453 -0.161207 3.59642)"  font-family="'Changa'" font-size="24" id="svg_1" y="25.81081" x="0.40541"  fill="currentcolor">
          ${name}
          </text></g></svg>`;
  }

  getNavbarSectionHTML(): string {
    return ` <header id="header" class="fixed-top">
    <div class="container d-flex align-items-center">

      <h1 class="logo me-auto"><a href="index.html">Association Name</a></h1>
      <!-- Uncomment below if you prefer to use an image logo -->
      <!-- <a href="index.html" class="logo me-auto"><img src="assets/img/logo.png" alt="" class="img-fluid"></a>-->
      <nav id="navbar" class="navbar order-last order-lg-0">
        <ul>
          <li><a class="nav-link scrollto active" href="#home">Home</a></li>
          <li><a class="nav-link scrollto" href="#about">About</a></li>
          <li><a class="nav-link scrollto" href="#membership">Membership</a></li>
          <li><a class="nav-link scrollto" href="#eventsId">Events/Gallery</a></li>
          <li><a class="nav-link scrollto" href="#committeeId">Team</a></li>
          <li><a class="nav-link scrollto" href="#donorsId">Donors</a></li>
          <li><a class="nav-link scrollto right-padding-60"  href="#contact">Contact</a></li>
        </ul>
        <i class="bi bi-list mobile-nav-toggle"></i>
      </nav>
    </div>
  </header>`;
  }

  addNavbarBlock(editor: any): void {
    const bm = editor.Blocks;
    bm.add('link-block', {
      label: 'Header',
      category: this.blockCategory,
      anchor: {
        editable: true,
      },
      media: this.getMediaIcon('NavBar'),
      content: this.getNavbarSectionHTML(),
    });
  }
  getHomeSectionHTML(): string {
    return `<section id="home" class="d-flex align-items-center">
    <div class="container">
      <h1>Welcome to Association</h1>
      <h2>We are team of talented designers making websites with Bootstrap</h2>
      <a href="#about" class="btn-get-started scrollto">Get Started</a>
    </div>
  </section> <section id="why-us" class="why-us">
  <div class="container">

    <div class="row">
      <div class="col-lg-4 d-flex align-items-stretch">
        <div class="content">
          <h3>Why Choose Association?</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit
            Asperiores dolores sed et. Tenetur quia eos. Autem tempore quibusdam vel necessitatibus optio ad corporis.
          </p>
          <div class="text-center">
            <a href="#" class="more-btn">Learn More <i class="bx bx-chevron-right"></i></a>
          </div>
        </div>
      </div>
      <div class="col-lg-8 d-flex align-items-stretch">
        <div class="icon-boxes d-flex flex-column justify-content-center">
          <div class="row">
            <div class="col-xl-4 d-flex align-items-stretch">
              <div class="icon-box mt-4 mt-xl-0">
                <i class="bx bx-receipt"></i>
                <h4>Corporis voluptates sit</h4>
                <p>Consequuntur sunt aut quasi enim aliquam quae harum pariatur laboris nisi ut aliquip</p>
              </div>
            </div>
            <div class="col-xl-4 d-flex align-items-stretch">
              <div class="icon-box mt-4 mt-xl-0">
                <i class="bx bx-cube-alt"></i>
                <h4>Ullamco laboris ladore pan</h4>
                <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt</p>
              </div>
            </div>
            <div class="col-xl-4 d-flex align-items-stretch">
              <div class="icon-box mt-4 mt-xl-0">
                <i class="bx bx-images"></i>
                <h4>Labore consequatur</h4>
                <p>Aut suscipit aut cum nemo deleniti aut omnis. Doloribus ut maiores omnis facere</p>
              </div>
            </div>
          </div>
        </div><!-- End .content-->
      </div>
    </div>

  </div>
</section>`;
  }

  addHomePageBlock(editor: any): void {
    const bm = editor.Blocks;

    bm.add('Home section', {
      label: 'Home Section',
      category: this.blockCategory,
      media: this.getMediaIcon('Home'),
      content: this.getHomeSectionHTML(),
    });
  }

  getAboutUsSectionHTML(): string {
    return `  <section id="about" class="about">
    <div class="container-fluid">

      <div class="row">
        <div class="col-xl-5 col-lg-6   d-flex justify-content-center align-items-stretch position-relative">
            <img src="assets//img/about.jpg" alt="" class="img-fluid">  
            <span class="videoLink"><a href="https://www.youtube.com/watch?v=jDDaplaOz7Q" class="glightbox play-btn mb-4"></a></span>  
        </div>

        <div class="col-xl-7 col-lg-6 icon-boxes d-flex flex-column align-items-stretch justify-content-center py-5 px-lg-5">
          <h3>Enim quis est voluptatibus aliquid consequatur fugiat</h3>
          <p>Esse voluptas cumque vel exercitationem. Reiciendis est hic accusamus. Non ipsam et sed minima temporibus laudantium. Soluta voluptate sed facere corporis dolores excepturi. Libero laboriosam sint et id nulla tenetur. Suscipit aut voluptate.</p>

          <div class="icon-box">
            <div class="icon"><i class="bx bx-fingerprint"></i></div>
            <h4 class="title"><a href="">Lorem Ipsum</a></h4>
            <p class="description">Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident</p>
          </div>

          <div class="icon-box">
            <div class="icon"><i class="bx bx-gift"></i></div>
            <h4 class="title"><a href="">Nemo Enim</a></h4>
            <p class="description">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque</p>
          </div>

          <div class="icon-box">
            <div class="icon"><i class="bx bx-atom"></i></div>
            <h4 class="title"><a href="">Dine Pad</a></h4>
            <p class="description">Explicabo est voluptatum asperiores consequatur magnam. Et veritatis odit. Sunt aut deserunt minus aut eligendi omnis</p>
          </div>

        </div>
      </div>

    </div>
  </section>`;
  }

  addAboutUsBlock(editor: any): void {
    const bm = editor.Blocks;

    bm.add('About Us', {
      label: 'About Us',
      category: this.blockCategory,
      media: this.getMediaIcon('About Us'),
      content: this.getAboutUsSectionHTML(),
    });
  }

  getMembershipSectionHTML(): string {
    return ` <section id="membership" class="services">
    <div class="container">

      <div class="section-title">
        <h2>Membership</h2>
        <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
      </div>

      <div class="row">
        <div class="col-lg-4 col-md-6 d-flex align-items-stretch">
          <div class="icon-box">
            <div class="icon"><i class="fas fa-heartbeat"></i></div>
            <h4><a href="">Lorem Ipsum</a></h4>
            <p>Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi</p>
          </div>
        </div>

        <div class="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0">
          <div class="icon-box">
            <div class="icon"><i class="fas fa-pills"></i></div>
            <h4><a href="">Sed ut perspiciatis</a></h4>
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore</p>
          </div>
        </div>

        <div class="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0">
          <div class="icon-box">
            <div class="icon"><i class="fas fa-hospital-user"></i></div>
            <h4><a href="">Magni Dolores</a></h4>
            <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia</p>
          </div>
        </div>

        <div class="col-lg-4 col-md-6 d-flex align-items-stretch mt-4">
          <div class="icon-box">
            <div class="icon"><i class="fas fa-dna"></i></div>
            <h4><a href="">Nemo Enim</a></h4>
            <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis</p>
          </div>
        </div>

        <div class="col-lg-4 col-md-6 d-flex align-items-stretch mt-4">
          <div class="icon-box">
            <div class="icon"><i class="fas fa-wheelchair"></i></div>
            <h4><a href="">Dele cardo</a></h4>
            <p>Quis consequatur saepe eligendi voluptatem consequatur dolor consequuntur</p>
          </div>
        </div>

        <div class="col-lg-4 col-md-6 d-flex align-items-stretch mt-4">
          <div class="icon-box">
            <div class="icon"><i class="fas fa-notes-medical"></i></div>
            <h4><a href="">Divera don</a></h4>
            <p>Modi nostrum vel laborum. Porro fugit error sit minus sapiente sit aspernatur</p>
          </div>
        </div>

      </div>

    </div>
  </section>`;
  }

  addMembershipBlock(editor: any): void {
    const bm = editor.Blocks;
    bm.add('Membership', {
      label: 'Membership Details',
      category: this.blockCategory,
      media: this.getMediaIcon('Membership', 80),
      content: this.getMembershipSectionHTML(),
    });
  }

  getEventsSectionHTML(): string {
    return ` <section id="eventsId" class="events">
                <div class="section-title">  
                  <h2 class="tab-title">Events/Gallery</h2>  
                </div> 
                <div id="events-dataId">
                  <h3>Content will be automatically generated from your feed within the application and displayed in this section.</h3>
                </div>
              </section>`;
  }

  addEventsBlock(editor: any): void {
    const bm = editor.Blocks;
    bm.add('Events', {
      label: 'Events Details',
      category: this.blockCategory,
      media: this.getMediaIcon('Events'),
      content: this.getEventsSectionHTML(),
    });
  }

  getCommitteeSectionHTML(): string {
    return `<section id="committeeId" class="events">
              <div class="section-title">  
                <h2 class="tab-title">Committee</h2>  
              </div>
              <div id="committee-dataId">
                <h3>Content will be automatically generated from your feed within the application and displayed in this section.</h3>
              </div>
            </section>`;
  }

  addCommitteeBlock(editor: any): void {
    const bm = editor.Blocks;
    bm.add('Committee', {
      label: 'Committee Details',
      category: this.blockCategory,
      media: this.getMediaIcon('Committee', 80),
      content: this.getCommitteeSectionHTML(),
    });
  }

  getSponsorSectionHTML(): string {
    return ``;
  }

  addSponsorsBlock(editor: any): void {
    //Not being implemented
  }

  getDonorsSectionHTML(): string {
    return `<section id="donorsId" class="donors">
              <div class="section-title">
                  <h2>Donors</h2>
              </div>
              <div id="donors-data">
               <h3>Content will be automatically generated from your feed within the application and displayed in this section.</h3>
              </div>
              <nav aria-label="Page navigation " class="float-right">
                <ul class="pagination justify-content-center" id="pagination"></ul>
              </nav>
            </section>`;
  }
  addDonorsBlock(editor: any): void {
    const bm = editor.Blocks;
    bm.add('Donors', {
      label: 'Donors Details',
      category: this.blockCategory,
      media: this.getMediaIcon('Donors'),
      content: this.getDonorsSectionHTML(),
    });
  }

  getContactUsSectionHTML(): string {
    return `<section id="contact" class="contact">
    <div class="section-title">
      <h2>Contact</h2>
    </div>
    <div class="container">
      <div class="row mt-5">
        <div class="col-lg-5">
          <div class="info">
            <div class="address">
              <i class="bi bi-geo-alt"></i>
              <h4>Location:</h4>
              <p>A108 Adam Street, New York, NY 535022</p>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="info">
            <div class="email">
              <i class="bi bi-envelope"></i>
              <h4>Email:</h4>
              <p>info@example.com</p>
            </div>
          </div>
        </div>
        <div class="col-lg-3">
          <div class="info">
            <div class="phone">
              <i class="bi bi-phone"></i>
              <h4>Call:</h4>
              <p>+1 5589 55488 55s</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>`;
  }
  addContactUsBlock(editor: any): void {
    const bm = editor.Blocks;
    bm.add('Contact Us', {
      label: 'Contact Us Details',
      category: this.blockCategory,
      media: this.getMediaIcon('Contact Us', 80),
      content: this.getContactUsSectionHTML(),
    });
  }

  getFooterSectionHTML(): string {
    return `<footer id="footer">

    <div class="container d-md-flex py-4">

      <div class="me-md-auto text-center text-md-start">
        <div class="copyright">
          &copy; Copyright <strong><span>Association Name</span></strong>. All Rights Reserved
        </div>
      </div>
      <div class="social-links text-center text-md-right pt-3 pt-md-0">
        <a href="#" class="twitter"><i class="bx bxl-twitter"></i></a>
        <a href="#" class="facebook"><i class="bx bxl-facebook"></i></a>
        <a href="#" class="instagram"><i class="bx bxl-instagram"></i></a>
        <a href="#" class="google-plus"><i class="bx bxl-skype"></i></a>
        <a href="#" class="linkedin"><i class="bx bxl-linkedin"></i></a>
      </div>
    </div>
  </footer>`;
  }

  addFooterBlock(editor: any): void {
    const bm = editor.Blocks;
    bm.add('Footer', {
      label: 'Footer Details',
      category: this.blockCategory,
      media: this.getMediaIcon('Footer'),
      content: this.getFooterSectionHTML(),
    });
  }

  getHtmlContent(): string {
    return this.getNavbarSectionHTML()
      + this.getHomeSectionHTML()
      + this.getAboutUsSectionHTML()
      + this.getMembershipSectionHTML()
      + this.getEventsSectionHTML()
      + this.getCommitteeSectionHTML()
      + this.getSponsorSectionHTML()
      + this.getDonorsSectionHTML()
      + this.getContactUsSectionHTML()
      + this.getFooterSectionHTML();
  }

  canLoadJavaScripts(): boolean {
    return true;
  }

}
