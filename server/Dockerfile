FROM ruby

RUN apt-get update -qq && apt-get install -y build-essential nodejs

###
# Yarn
###
WORKDIR /tmp
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install yarn

WORKDIR /ranwork

###
# Ruby Gems
###
RUN gem update --system \
    && gem install bundler -v 2.0.1 --force \
    && gem install rubygems-bundler
COPY Gemfile* /tmp/gemfiles/
WORKDIR /tmp/gemfiles
RUN bundle install

WORKDIR /ranwork

EXPOSE 3000
