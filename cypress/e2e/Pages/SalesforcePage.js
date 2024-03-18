class SalesforcePage{

    emailAndOtpTextField(){
        return cy.get('idx-standard-login-page').shadow().find('.left').shadow().find('lwc-wes-input').shadow().find('[id="field"]')
    }
    nextButtonOnEnterEmailPage(){
        return cy.get('idx-standard-login-page').shadow().find('.left').shadow().find('lwc-wes-button')
    }
    submitButton(){
        return cy.get('idx-standard-login-page').shadow().find('.left').shadow().find('lwc-wes-button')
    }

}
export default SalesforcePage