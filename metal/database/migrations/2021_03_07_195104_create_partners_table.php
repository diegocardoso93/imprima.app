<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePartnersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('partners', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('site_name')->nullable();
            $table->string('site_url')->nullable();
            $table->string('site_category')->nullable();
            $table->string('zip')->nullable();
            $table->string('city')->nullable();
            $table->char('uf', 2)->nullable();
            $table->string('neighborhood')->nullable();
            $table->string('address')->nullable();
            $table->string('address_extra')->nullable();
            $table->string('policy')->nullable(); // all, allow, block
            $table->integer('status')->default(1); // 1 ativo, 0 desativo
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('partners');
    }
}
