FROM cimg/node:16.5.0-browsers

RUN mkdir \
      /home/circleci/.cache \
      /home/circleci/.npm \
      /home/circleci/project/node_modules \
      /home/circleci/project/reports \
      /home/circleci/project/screenshots

VOLUME \
  /home/circleci/.cache \
  /home/circleci/.npm

ENV BROSWER=chrome \
    HEADLESS=true \
    RETRIES=0

COPY --chown=circleci:circleci package.json package-lock.json /home/circleci/project/
COPY --chown=circleci:circleci .env .env.api .eslintignore .eslintrc.js .npmrc .prettierignore .prettierrc.js apollo.config.js codegen.yml cucumber-report.js cucumber.js tsconfig.json /home/circleci/project/
COPY --chown=circleci:circleci src/ /home/circleci/project/src/

# Note: don't use ENTRYPOINT - this would disable X virtual framebuffer and cause weird issues in browsers/playwright
CMD ["/bin/bash"]
