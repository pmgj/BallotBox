package view;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.Font;

import javax.swing.BorderFactory;
import javax.swing.BoxLayout;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.SwingConstants;

public class Input2 extends JPanel {
    private Cargo[] offices;
    private int officeIndex = 0;
    private int numberIndex = 0;
    private JLabel lblOffice;
    private JLabel[] lblDigits;
    private JPanel jpDigits = new JPanel();
    private JPanel jpOffice = new JPanel();

    public Input2(Cargo[] cargos) {
        this.offices = cargos;
        var cargo = this.offices[this.officeIndex];
        this.setLayout(new BoxLayout(this, BoxLayout.Y_AXIS));
        this.add(this.jpOffice);
        this.lblOffice = new JLabel(cargo.getNome());
        this.lblOffice.setFont(new Font("Serif", Font.PLAIN, 24));
        this.jpOffice.add(this.lblOffice);
        this.createLabels(cargo.getQuantidadeNumeros());
        this.add(jpDigits);
    }

    private void createLabels(int quantity) {
        this.lblDigits = new JLabel[quantity];
        for (var i = 0; i < quantity; i++) {
            this.lblDigits[i] = new JLabel(" ", SwingConstants.CENTER);
            this.lblDigits[i].setBorder(BorderFactory.createLineBorder(Color.black));
            this.lblDigits[i].setFont(new Font("Serif", Font.PLAIN, 36));
            this.lblDigits[i].setPreferredSize(new Dimension(40, 40));
            this.jpDigits.add(this.lblDigits[i]);
        }
    }

    public void confirma() {
        this.officeIndex++;
        this.numberIndex = 0;
        if (this.officeIndex < this.offices.length) {
            var cargo = this.offices[this.officeIndex];
            this.lblOffice.setText(cargo.getNome());
            this.jpDigits.removeAll();
            this.jpDigits.repaint();
            this.createLabels(cargo.getQuantidadeNumeros());
        } else {
            this.lblOffice.setText("FIM");
            this.jpDigits.removeAll();
            this.jpDigits.repaint();
        }
    }

    public void corrige() {
        this.numberIndex = 0;
        for (var label : this.lblDigits) {
            label.setText("");
        }
    }

    public void setNumber(String n) {
        if (this.numberIndex < this.lblDigits.length) {
            var label = this.lblDigits[this.numberIndex++];
            label.setText(n);
        }
    }
}
