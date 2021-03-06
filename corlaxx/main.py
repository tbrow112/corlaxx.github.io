#!/usr/bin/env python
#
# Copyright 2007 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
import webapp2
import jinja2

env = jinja2.Environment(loader=jinja2.FileSystemLoader(''))

class MainHandler(webapp2.RequestHandler):
    def get(self):
        main_template = env.get_template('cloraxx.html')
        self.response.out.write(main_template.render())
    def post(self):  # Here's the new POST method in the MainHandler.
        self.response.out.write('You have submitted your madlib')

class WelcomeHandler(webapp2.RequestHandler):
    def get(self):
        main_template = env.get_template('welcome.html')
        self.response.out.write(main_template.render())


app = webapp2.WSGIApplication([
    ('/color', MainHandler),
    ('/', WelcomeHandler)
], debug=True)
