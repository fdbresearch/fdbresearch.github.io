from bs4 import BeautifulSoup
import glob, os

tagName = "footer"
tag_doc = """
<footer class="g-bg-secondary">
      <div class="g-brd-bottom g-brd-secondary-light-v2 g-py-20">
      </div>
      <div class="container">
       <!-- Footer - Bottom Section -->
       <div class="row align-items-center">
        <div class="col-md-4 g-brd-right--md g-brd-secondary-light-v2 g-mb-30">
         <!-- Copyright -->
         <p class="g-color-secondary-light-v1 g-font-size-12 mb-0">
          © 2017-2020 All Rights Reserved.
         </p>
         <!-- End Copyright -->
        </div>
        <div class="col-md-8 g-brd-right--md g-brd-secondary-light-v2 g-mb-30 text-right">
         <!-- Links -->
         <ul class="list-inline mb-0">
          <li class="list-inline-item g-pl-0 g-pr-10">
           <a class="u-link-v5 g-color-black-opacity-0_5 g-font-size-12" href="contacts.html">
            Contact Us
           </a>
          </li>
          <li class="list-inline-item g-px-10">
           <a class="u-link-v5 g-color-black-opacity-0_5 g-font-size-12">
            Last modified: August 2020
           </a>
          </li>
         </ul>
         <!-- End Links -->
        </div>
       </div>
       <!-- End Footer - Bottom Section -->
      </div>
     </footer>
"""

s = ""

import os
for htmlFile in os.listdir("."):
    if not htmlFile.endswith(".html"):
        continue


    print(htmlFile)

    with open(htmlFile, 'r+') as file:
        html_doc = file.read()

        soup = BeautifulSoup(html_doc, 'html.parser')
        tag_soup = BeautifulSoup(tag_doc, 'html.parser')

        # print(soup.prettify())

        for tag in soup.select(tagName):
            tag.replace_with(tag_soup)

        
        s = soup.prettify()
        # print(soup)


    with open(htmlFile, 'w') as file:
        file.write(s)