#!/bin/expect
set PASS mypassword
cd /home/dhwuho/csc510
spawn ansible-playbook deploy.yml -K
expect {
      "password" { send "$PASS\n" }
}
expect EOF
