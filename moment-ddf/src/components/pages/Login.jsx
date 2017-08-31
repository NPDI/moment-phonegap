import React, { Component } from "react";

import {
  ContentBlock,
  Views,
  View,
  Pages,
  Page,
  Icon,
  List,
  ListItem,
  LoginScreenTitle,
  Button,
  ListLabel,
  FormLabel,
  FormInput,
  GridRow
} from "framework7-react";

class AppLoginScreen extends Component {
  render() {
    return (
      <Views>
        <View id="main-view" main url="/">
          <Pages>
            <Page loginScreen>
              <ContentBlock>
                <GridRow>
                  <LoginScreenTitle>
                    <div class="">
                      <Icon
                        fa="camera-retro"
                        style={{ verticalAlign: "text-top" }}
                      />
                      <h3 style={{ display: "inline" }}> Moment </h3>
                    </div>
                  </LoginScreenTitle>
                </GridRow>
                <GridRow>
                  <List form>
                    <ListItem>
                      <FormLabel>
                        <div class="item-media">
                          <Icon fa="user" />
                        </div>
                      </FormLabel>
                      <FormInput name="email" placeholder="Email" type="text" />
                    </ListItem>
                    <ListItem>
                      <FormLabel>
                        <div class="item-media">
                          <Icon fa="key" />
                        </div>
                      </FormLabel>
                      <FormInput
                        name="password"
                        type="password"
                        placeholder="Senha"
                      />
                    </ListItem>
                  </List>
                </GridRow>
                <GridRow>
                  <List>
                    <Button fill>Entrar</Button>
                    <ListLabel>
                      <p>Realizar cadastro.</p>
                    </ListLabel>
                  </List>
                </GridRow>
              </ContentBlock>
            </Page>
          </Pages>
        </View>
      </Views>
    );
  }
}

export default AppLoginScreen;
